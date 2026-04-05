function Navbar(){
    return(
        <div className="navbar">
            <h3>Edutech</h3>
            {/* //this creates navbar and navlinks separately */}

            <div className="nav-links">
                <button className="home">Home</button>
                <button className="about">About</button>
                <button className="course">Course</button>
                <button className="contact">Contact</button>
            </div>
        </div>
        
    );
}

export default Navbar