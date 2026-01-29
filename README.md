# PDF Bill Summarizer

A comprehensive bill/invoice summarizer application that extracts key information from invoices using AI-powered text analysis.

## 🚀 Features

- **PDF Upload & Processing**: Upload bill PDFs for automatic text extraction
- **Invoice Parsing**: Extract billed to, total amount, due date, and services
- **Modern UI**: Professional, responsive interface with drag-and-drop support
- **Multi-Service Architecture**: FastAPI + Spring Boot + React
- **Real-time Processing**: Instant invoice summarization

## 🏗️ Architecture

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   React     │────▶ │ Spring Boot  │────▶ │   FastAPI   │
│  Frontend   │      │   Backend    │      │ RAG Service │
│ (Port 5173) │      │ (Port 8080)  │      │ (Port 8000) │
└─────────────┘      └──────────────┘      └─────────────┘
```

## 📁 Project Structure

```
Bill Summarizer/
├── frontend/              # React + Vite frontend
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── services/     # API integration
│   │   ├── App.jsx       # Main app component
│   │   └── App.css       # Styling
│   └── package.json
│
├── backend/              # Spring Boot REST API
│   ├── src/main/java/com/billsummarizer/backend/
│   │   ├── controller/  # REST endpoints
│   │   ├── service/     # Business logic
│   │   ├── dto/         # Data transfer objects
│   │   └── config/      # Configuration
│   └── pom.xml
│
└── rag-service/         # FastAPI Python service
    ├── main.py          # FastAPI endpoints
    ├── rag_utils.py     # RAG utilities
    └── requirements.txt

```

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool
- **Axios** - HTTP client
- **CSS3** - Styling

### Backend
- **Spring Boot 4.0.2** - Java framework
- **Java 25** - Programming language
- **RestTemplate** - HTTP client
- **Lombok** - Boilerplate reduction
- **Maven** - Dependency management

### RAG Service
- **FastAPI** - Python web framework
- **Uvicorn** - ASGI server
- **Sentence Transformers** - AI models
- **Pydantic** - Data validation
- **Python 3.14** - Programming language

## 📦 Installation

### Prerequisites
- Node.js 16+
- Java 21+
- Python 3.10+
- Maven 3.8+

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### RAG Service Setup
```bash
cd rag-service
python -m venv venv
.\venv\Scripts\Activate.ps1  # Windows
# source venv/bin/activate    # Linux/Mac
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

## 🚀 Running the Application

1. **Start RAG Service** (Terminal 1):
```bash
cd rag-service
.\venv\Scripts\Activate.ps1
uvicorn main:app --reload --port 8000
```

2. **Start Spring Boot Backend** (Terminal 2):
```bash
cd backend
mvn spring-boot:run
```

3. **Start React Frontend** (Terminal 3):
```bash
cd frontend
npm run dev
```

4. **Access the Application**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8080
   - FastAPI Docs: http://localhost:8000/docs

## 📝 API Endpoints

### Spring Boot Backend
- `POST /api/invoice/summarize` - Summarize invoice text

### FastAPI Service
- `POST /summarize-text` - Extract invoice information
- `POST /upload-pdf` - Upload and process PDF
- `GET /health` - Health check

## 🎨 UI Features

- Drag & drop file upload
- Real-time processing indicator
- Color-coded summary cards
- Detailed service breakdown
- Responsive design
- Professional styling

## 📊 Sample Response

```json
{
  "billed_to": "Amita Roy",
  "total_amount": "₹56,000",
  "due_date": "June 17, 2020",
  "services_summary": "Software Testing & Debugging: 1 x ₹15,000 = ₹15,000; Software Testing & Debugging: 1 x ₹13,000 = ₹13,000; Coding: 1 x ₹15,000 = ₹15,000; Coding: 1 x ₹13,000 = ₹13,000"
}
```

## 🔧 Configuration

### Backend (application.properties)
```properties
server.port=8080
fastapi.base-url=http://127.0.0.1:8000
```

### Frontend (vite.config.js)
```javascript
export default defineConfig({
  server: {
    port: 5173
  }
})
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Nishant**
- GitHub: [@Nishant28-sh](https://github.com/Nishant28-sh)

## 🙏 Acknowledgments

- HuggingFace for transformer models
- Spring Boot team
- FastAPI framework
- React community
