const Footer = () => {
  return (
    <footer className="footer">
      <button className="footer-button">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="8" stroke="#4F7CFF" strokeWidth="2"/>
          <path d="M10 14V10M10 6H10.01" stroke="#4F7CFF" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        How does it work?
      </button>
      <button className="footer-button">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="4" width="14" height="12" rx="2" stroke="#4F7CFF" strokeWidth="2"/>
          <path d="M7 8H13M7 12H10" stroke="#4F7CFF" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        Data Security
      </button>
      <button className="footer-button">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="#4F7CFF" strokeWidth="2"/>
          <path d="M2 10H18" stroke="#4F7CFF" strokeWidth="2"/>
        </svg>
        Contact Support
      </button>
    </footer>
  );
};

export default Footer;
