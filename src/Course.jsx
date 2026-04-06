// importing a default image in case a course image is missing
import Loading from "./Image/Loading.png";

// Course is a reusable card component
// props contains the data sent from CourseList.jsx
function Course(props) {
  // if the course name is missing, this card will not render
  // the expression after && only runs when props.name exists
  return (
    props.name && (
      <div className="card">
        {/* course image */}
        <img src={props.image || Loading} alt="Course" />

        {/* course title */}
        <h1>{props.name}</h1>

        {/* course price */}
        <h1>{props.price}</h1>

        {/* course rating */}
        <span>{props.rating}</span>
      </div>
    )
  );
}

// exporting this component so CourseList.jsx can use it many times
export default Course;
