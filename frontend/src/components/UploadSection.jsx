import { useState } from "react";

const UploadSection = ({ onTextExtracted }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    // For now, just load sample text when file is uploaded
    const sampleText = `RAHUL PATEL—SOFTWARE ENGINEER
Billing Invoice
INVOICE NO. 123 / MAY 17, 2020
This invoice is billed to:
AMITA ROY
123 ANYWHERE ST.
Description Unit x Price Amount Due
Software Testing & Debugging 1 x ₹15,000 ₹15,000 only
1 x ₹13,000 ₹13,000 only
Coding 1 x ₹15,000 ₹15,000 only
1 x ₹13,000 ₹13,000 only
Total Amount ₹56,000
Bank Details
PLK Regional Trust Bank
Account No.
ABC-1234567
Due: June 17, 2020
123 Anywhere Street, Any City
hello@reallygreatsite.com`;
    
    onTextExtracted(sampleText);
  };

  return (
    <div className="upload-section">
      <h1 className="upload-title">Upload Your Bill PDF</h1>
      <p className="upload-subtitle">Upload your bill document to generate a quick summary.</p>

      <div
        className={`upload-area ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="upload-icon">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="30" r="28" fill="#E0EAFF"/>
            <path d="M30 20V40M20 30L30 20L40 30" stroke="#4F7CFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p className="upload-text">
          <span className="upload-drag-text">Drag & Drop your file here</span>
          <span className="upload-or"> or</span>
        </p>
        <label htmlFor="file-upload" className="upload-button">
          Upload Bill PDF
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileInput}
          style={{ display: 'none' }}
        />
        <p className="upload-formats">Supported formats: PDF, Scanned Documents</p>
      </div>

      <div className="upload-divider">
        <span>OR</span>
      </div>

      <button className="view-previous-button">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M8 4H4V8M4 4L9 9" stroke="#4F7CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 16H16V12M16 16L11 11" stroke="#4F7CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        View Previous Bills
      </button>
    </div>
  );
};

export default UploadSection;
