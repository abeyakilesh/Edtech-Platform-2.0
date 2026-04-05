//This is a course component
import Loading from "./Image/Loading.png";

function Course({image = Loading,name = "Course", price = 0.00}){
    return(
        <div className="card">
            <img src={image} alt="Image"/>
            <h1>{name}</h1>
            <h1>{price}</h1>
        </div>
    );
}

export default Course

//since course and its component structure is same and we only need to use the structure again
//we are using props to update values accordingly from java script from some where else!