// importing the Course component so we can reuse one card design many times
import Course from "./Course";

// importing images for each course card
import html from "./Image/html.png";
import css from "./Image/css.png";
import js from "./Image/js.png";
import react from "./Image/react.png";

// this component creates and displays the full course list
function CourseList() {
  // array of course objects
  // each object stores the details for one course
  const courses = [
    {
      // unique id for React key
      id: 1,
      // course title
      name: "Html",
      // course price
      price: 99,
      // image used in the card
      image: html,
      // course rating
      rating: 5,
      // controls whether the course should be shown
      login: true,
    },
    {
      id: 2,
      name: "CSS",
      price: 299,
      image: css,
      rating: 5,
      login: true,
    },
    {
      id: 3,
      name: "JS",
      price: 499,
      image: js,
      rating: 5,
      login: true,
    },
    {
      id: 4,
      name: "React",
      price: 799,
      image: react,
      rating: 5,
      login: true,
    },
  ];

  // sort the courses by price in ascending order
  // a and b are two course objects picked by JavaScript during sorting
  // if result is negative, a comes first
  // if result is positive, b comes first
  courses.sort((a, b) => a.price - b.price);

  // map goes through each course object one by one
  // for every object, it creates one <Course /> component
  const courseList = courses.map((course) => (
    
    <Course
      key={course.id} name={course.name} price={course.price}
      image={course.image} rating={course.rating} login={course.login} 
    />

  ));

  // return the final UI
  // {courseList} displays all Course components created by map
  return (
    <div className="course-list">
      {courseList} 
    </div>
  );
}

// exporting this component so App.jsx can use it
export default CourseList;
