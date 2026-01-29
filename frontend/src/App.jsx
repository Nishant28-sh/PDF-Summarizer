import { useState } from "react";
import Header from "./components/Header";
import UploadSection from "./components/UploadSection";
import BillSummary from "./components/BillSummary";
import Footer from "./components/Footer";
import { summarizeInvoice } from "./services/api";
import "./App.css";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTextExtracted = async (text) => {
    setLoading(true);
    try {
      const response = await summarizeInvoice(text);
      setResult(response.data);
    } catch (err) {
      alert("Error while summarizing invoice");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <div className="content-wrapper">
          <UploadSection onTextExtracted={handleTextExtracted} />
          <BillSummary result={result} loading={loading} />
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default App;
