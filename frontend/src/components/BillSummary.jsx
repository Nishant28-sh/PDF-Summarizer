const BillSummary = ({ result, loading }) => {
  if (!result && !loading) return null;

  return (
    <div className="bill-summary-container">
      {loading && (
        <div className="analyzing-header">
          <div className="analyzing-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" rx="6" fill="#4F7CFF"/>
              <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="analyzing-text">
            <h3>Invoice Summary</h3>
            <p>Analyzing your document...</p>
          </div>
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
        </div>
      )}

      {result && (
        <>
          <div className="summary-cards">
            <div className="summary-card blue">
              <div className="card-label">Total Amount</div>
              <div className="card-value">₹ {result.total_amount || 'N/A'}</div>
            </div>
            <div className="summary-card orange">
              <div className="card-label">Due Date</div>
              <div className="card-value">{result.due_date || 'N/A'}</div>
            </div>
            <div className="summary-card green">
              <div className="card-label">Billed To</div>
              <div className="card-value">{result.billed_to || 'N/A'}</div>
            </div>
          </div>

          <div className="bill-details-container">
            <div className="bill-details-left">
              <div className="bill-provider">
                <div className="provider-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect width="24" height="24" rx="6" fill="#4F7CFF"/>
                    <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="provider-name">{result.billed_to || 'Service Provider'}</div>
              </div>

              <div className="bill-services">
                <h4>Services Summary</h4>
                <div className="services-content">
                  {result.services_summary ? (
                    result.services_summary.split(';').map((service, index) => {
                      const trimmed = service.trim();
                      if (!trimmed) return null;
                      
                      // Extract service name and amount details
                      // Format: "Service Name: 1 x ₹15,000 = ₹15,000"
                      const match = trimmed.match(/(.+?):\s*(.+)/);
                      if (match) {
                        const serviceName = match[1].trim();
                        const serviceDetails = match[2].trim();
                        
                        return (
                          <div key={index} className="service-item">
                            <div className="service-info">
                              <span className="service-name">{serviceName}</span>
                              <span className="service-details">{serviceDetails}</span>
                            </div>
                          </div>
                        );
                      }
                      return (
                        <div key={index} className="service-item">
                          <span className="service-name">{trimmed}</span>
                        </div>
                      );
                    })
                  ) : (
                    'No services found'
                  )}
                </div>
              </div>
            </div>

            <div className="summary-overview">
              <h3 className="overview-title">Summary Overview</h3>
              <div className="overview-items">
                <div className="overview-item">
                  <div className="overview-icon">📄</div>
                  <div className="overview-details">
                    <div className="overview-label">Bill Type</div>
                    <div className="overview-value">Invoice</div>
                  </div>
                </div>
                <div className="overview-item">
                  <div className="overview-icon">📅</div>
                  <div className="overview-details">
                    <div className="overview-label">Billing Period</div>
                    <div className="overview-value">Current</div>
                  </div>
                </div>
                <div className="overview-item">
                  <div className="overview-icon">💰</div>
                  <div className="overview-details">
                    <div className="overview-label">Total Due</div>
                    <div className="overview-value">₹ {result.total_amount || 'N/A'}</div>
                  </div>
                </div>
                <div className="overview-item">
                  <div className="overview-icon">⏰</div>
                  <div className="overview-details">
                    <div className="overview-label">Payment Due Date</div>
                    <div className="overview-value">{result.due_date || 'N/A'}</div>
                  </div>
                </div>
              </div>
              <button className="download-button">Download Summary</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BillSummary;
