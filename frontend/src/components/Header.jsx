const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="6" fill="#4F7CFF"/>
            <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="logo-text">PDF Bill Summarizer</span>
        </div>
      </div>
      <nav className="header-nav">
        <a href="#" className="nav-link active">Dashboard</a>
        <a href="#" className="nav-link">History</a>
        <a href="#" className="nav-link">Settings</a>
      </nav>
      <div className="header-right">
        <div className="user-profile">
          <div className="user-avatar">R</div>
          <span className="user-name">Rahul</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6L8 10L12 6" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;
