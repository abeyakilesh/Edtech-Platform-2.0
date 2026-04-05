//app willl have all the components as a main folder
import Navbar from "./Navbar";
import Course from "./Course";

//For images
import html from './Image/html.png';
import css from './Image/css.png';
import js from './Image/js.png';


function App(){
    return(
        <div>
            <Navbar/>
            <div className="course-list">
                {/* //we are sending this value as props individually! easy work */}
                <Course name="Html" price="₹99" image={html} show={true} rating={5}/>
                <Course name="CSS" price="₹299" image={css} show={true} rating={5}/>
                <Course name= "js" price="₹499" image={js} show={false} rating={5}/>
            </div>
        </div>

    );
}

export default App