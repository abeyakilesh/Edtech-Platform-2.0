// Navbar creates the top section of the page
function Navbar() {
  return (
    <header className="navbar">
      <a className="brand-block" href="#home" aria-label="Go to homepage">
        <span className="brand-mark">E</span>
        <div>
          <h3>EduCore</h3>
          <p>Learn. Build. Get hired.</p>
        </div>
      </a>

      <nav className="nav-links">
        <a href="#home">Home</a>
        <a href="#programs">Programs</a>
        <a href="#mentors">Mentors</a>
        <a href="#contact">Contact</a>
      </nav>

      <a className="nav-cta" href="#programs">
        Start Learning
      </a>
    </header>
  );
}

// exporting Navbar so App.jsx can use it
export default Navbar;
