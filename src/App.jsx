//app willl have all the components as a main folder
import Navbar from "./Navbar";
import Course from "./Course";

import html from './Image/html.png';
import css from './Image/css.png';
import js from './Image/js.png';


function App(){
    return(
        <div>
            <Navbar/>
            <div className="course-list">
                {/* //we are sending this value as props individually! easy work */}
                <Course name="Html" price="₹199" image={html}/>
                <Course name="CSS" price={199} image={css}/>
                <Course name= "js" price="₹499" image={js}/>
            </div>
        </div>

    );
}

export default App