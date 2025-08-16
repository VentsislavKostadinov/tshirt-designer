export default function Header() {
  return (
    <header className="header">
      <div className="headerBox logo" style={{ cursor: 'pointer' }}>
        <span className="clickLogo"><b>Logo</b></span>
      </div>
      <div className="headerBox exit" style={{ cursor: 'pointer' }}>
        <div className="exitText"><b>Exit</b></div>
        <div className="exitImage"><span className="exitCross"></span></div>
      </div>
    </header>
  )
}