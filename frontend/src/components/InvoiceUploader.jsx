import { useState } from "react";
import { summarizeInvoice } from "../services/api";

const InvoiceUploader = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await summarizeInvoice(text);
      setResult(response.data);
    } catch (err) {
      alert("Error while summarizing invoice");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Invoice Summarizer</h2>

      <textarea
        rows="10"
        cols="80"
        placeholder="Paste extracted invoice text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br /><br />
      <button onClick={handleSubmit}>
        {loading ? "Processing..." : "Summarize"}
      </button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Summary</h3>
          <p><b>Billed To:</b> {result.billed_to}</p>
          <p><b>Total Amount:</b> {result.total_amount}</p>
          <p><b>Due Date:</b> {result.due_date}</p>
          <p><b>Services:</b> {result.services_summary}</p>
        </div>
      )}
    </div>
  );
};

export default InvoiceUploader;
