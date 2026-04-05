//This is a course component
import Loading from "./Image/Loading.png";
import PropTypes from "prop-types"

function Course(props){

    return(
        <div className="card">
            <img src={props.image} alt="Image"/>
            <h1>{props.name}</h1>
            <h1>{props.price}</h1>
            <span>Rating : {props.rating}</span>
        </div>
    );
}

//default values

export default Course

//since course and its component structure is same and we only need to use the structure again
//we are using props to update values accordingly from java script from some where else!
