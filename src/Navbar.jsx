// Navbar creates the top section of the page
function Navbar() {
  return (
    <div className="navbar">
      {/* website name/logo text */}
      <h3>Edutech</h3>

      {/* wrapper for navigation buttons */}
      <div className="nav-links">
        {/* navigation buttons */}
        <button className="home">Home</button>
        <button className="about">About</button>
        <button className="course">Course</button>
        <button className="contact">Contact</button>
      </div>
    </div>
  );
}

// exporting Navbar so App.jsx can use it
export default Navbar;
