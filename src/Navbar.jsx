// Navbar creates the top section of the page
function Navbar() {
  return (
    <header className="navbar">
      <div className="brand-block">
        <span className="brand-mark">E</span>
        <div>
          <h3>EduCore</h3>
          <p>Learn. Build. Get hired.</p>
        </div>
      </div>

      <nav className="nav-links">
        <a href="#home">Home</a>
        <a href="#programs">Programs</a>
        <a href="#mentors">Mentors</a>
        <a href="#contact">Contact</a>
      </nav>

      <button className="nav-cta">Start Learning</button>
    </header>
  );
}

// exporting Navbar so App.jsx can use it
export default Navbar;
