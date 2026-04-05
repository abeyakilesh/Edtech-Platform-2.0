import Course from "./Course";
import html from "./Image/html.png";
import css from "./Image/css.png";
import js from "./Image/js.png";

function CourseList() {
  // creating a list of objects
  const courses = [
    {
      name: "Html",
      price: "₹99",
      image: html,
      rating: 5,
      login: true,
    },
    {
      name: "CSS",
      price: "₹299",
      image: css,
      rating: 5,
      login: true,
    },
    {
      name: "JS",
      price: "₹499",
      image: js,
      rating: 5,
      login: true,
    },
    {
      name: "React",
      price: "₹799",
      image: js,
      rating: 5,
      login: true,
    },
  ];

  const courseList = courses.map((course) => (
    <Course
      key={course.name}
      name={course.name}
      price={course.price}
      image={course.image}
      rating={course.rating}
      login={course.login}
    />
  ));

  return (
    <div className="course-list">
      {courseList}
    </div>
  );
}

export default CourseList;
