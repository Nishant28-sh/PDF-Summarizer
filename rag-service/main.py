from rag_utils import chunk_text, build_faiss_index, retrieve_relevant_chunks
from fastapi import FastAPI, UploadFile, File, Request, Body
from pydantic import BaseModel
import pdfplumber
import os
import requests
import re

try:
    from dotenv import load_dotenv
    load_dotenv()
except Exception:
    pass

app = FastAPI()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

HF_API_KEY = os.getenv("HUGGINGFACE_TOKEN", "")

HF_MODEL_URL = (
    "https://router.huggingface.co/hf-inference/models/"
    "sshleifer/distilbart-cnn-12-6"
)

HEADERS = {
    "Authorization": f"Bearer {HF_API_KEY}",
    "Content-Type": "application/json"
}

# -----------------------------
# Health Check
# -----------------------------
@app.get("/")
def home():
    return {"message": "LLM Service is running"}

# -----------------------------
# PDF Upload & Text Extraction
# -----------------------------
@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as f:
        f.write(await file.read())

    extracted_text = ""

    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                extracted_text += text + "\n"

    if not extracted_text.strip():
        return {"error": "No extractable text found"}

    return {
        "filename": file.filename,
        "extracted_text": extracted_text
    }

# -----------------------------
# FINAL Invoice Processing
# -----------------------------
class SummarizeRequest(BaseModel):
    text: str | None = None
    extracted_text: str | None = None


@app.post("/summarize-text")
async def summarize_text(
    request: Request,
    payload: SummarizeRequest | None = Body(default=None),
    text: str = None
):

    raw_text = text or ""

    if payload:
        raw_text = payload.text or payload.extracted_text or raw_text

    if not raw_text:
        body_bytes = await request.body()
        if body_bytes:
            raw_body = body_bytes.decode("utf-8", errors="ignore").strip()
            # Try to parse JSON body (could be a string or object)
            if raw_body:
                try:
                    import json
                    parsed = json.loads(raw_body)
                    if isinstance(parsed, dict):
                        raw_text = parsed.get("text") or parsed.get("extracted_text") or raw_text
                    elif isinstance(parsed, str):
                        raw_text = parsed
                except:
                    raw_text = raw_body

    # If raw_text is a JSON string, try to parse it
    if isinstance(raw_text, str) and raw_text.strip().startswith('{'):
        try:
            import json
            data = json.loads(raw_text)
            raw_text = data.get('extracted_text', raw_text)
        except:
            pass

    # Handle escaped newlines and surrounding quotes
    if isinstance(raw_text, str):
        raw_text = raw_text.strip()
        if raw_text.startswith('"') and raw_text.endswith('"'):
            raw_text = raw_text[1:-1]
        raw_text = raw_text.replace("\\n", "\n")
        raw_text = raw_text.replace("\u2014", "-")

    # DEBUG: show first 300 chars after normalization
    print("[DEBUG] raw_text preview:", raw_text[:300])

    # ---------- BILLED TO ----------
    billed_to_match = re.search(
        r"billed\s+to[\s:\n]+([A-Z][A-Z\s]+?)(?=\n\d|\n[A-Z]{2,}\s[A-Z])",
        raw_text,
        re.IGNORECASE
    )

    billed_to = (
        billed_to_match.group(1).strip().title()
        if billed_to_match else "Not found"
    )

    # ---------- TOTAL AMOUNT ----------
    total_amount_match = re.search(
        r"Total Amount\s*₹?\s*([\d,]+)",
        raw_text,
        re.IGNORECASE
    )
    total_amount = (
        f"₹{total_amount_match.group(1)}"
        if total_amount_match else "Not found"
    )

    # ---------- DUE DATE ----------
    due_date_match = re.search(
        r"Due\s*[:\-]?\s*([A-Za-z]+\s+\d{1,2},\s+\d{4})",
        raw_text,
        re.IGNORECASE
    )
    due_date = due_date_match.group(1) if due_date_match else "Not found"

    # ---------- SERVICES ----------
    def _to_int(amount_text: str) -> int:
        return int(re.sub(r"[^\d]", "", amount_text)) if amount_text else 0

    desc_match = re.search(
        r"Description.*?(?=Total Amount|Bank Details|$)",
        raw_text,
        re.DOTALL | re.IGNORECASE
    )
    description_block = desc_match.group(0) if desc_match else ""
    description_lines = [line.strip() for line in description_block.splitlines() if line.strip()]

    qty_pattern = re.compile(r"(\d+)\s*x\s*₹?\s*([\d,]+)\s*₹?\s*([\d,]+)", re.IGNORECASE)

    services_items = []
    current_service = None

    for line in description_lines:
        if re.match(r"^description\b", line, re.IGNORECASE):
            continue

        qty_match = qty_pattern.search(line)
        has_letters = re.search(r"[A-Za-z]", line) is not None

        if has_letters and qty_match:
            service_name = line[:qty_match.start()].strip()
            if service_name:
                current_service = service_name
            qty, unit_price, line_total = qty_match.groups()
            services_items.append(
                (current_service or "Service", qty, unit_price, line_total)
            )
        elif has_letters and not qty_match:
            current_service = line
        elif qty_match:
            qty, unit_price, line_total = qty_match.groups()
            services_items.append(
                (current_service or "Service", qty, unit_price, line_total)
            )

    services_list = []
    computed_total = 0
    for name, qty, unit_price, line_total in services_items:
        computed_total += _to_int(line_total)
        services_list.append(
            f"{name}: {qty} x ₹{unit_price} = ₹{line_total}"
        )

    if services_list:
        services_summary = "; ".join(services_list)
    else:
        services_summary = "Unable to summarize services"

    return {
        "billed_to": billed_to,
        "total_amount": total_amount,
        "due_date": due_date,
        "services_summary": services_summary
    }
