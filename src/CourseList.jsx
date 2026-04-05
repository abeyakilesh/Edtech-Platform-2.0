import Course from "./Course";
import html from "./Image/html.png";
import css from "./Image/css.png";
import js from "./Image/js.png";

function CourseList() {
  // creating a list of objects
  const courses = [
    {
      id:1,
      name: "Html",
      price: 99,
      image: html,
      rating: 5,
      login: true,
    },
    {
      id:2,
      name: "CSS",
      price: 299,
      image: css,
      rating: 5,
      login: true,
    },
    {
      id:3,
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
      image: js,
      rating: 5,
      login: true,
    },
  ];

  const filteredCourses = courses
    .filter((course) => course.price < 500)
    .sort((a, b) => a.price - b.price);

  const courseList = filteredCourses.map((course) => (
    <Course
      key={course.id}
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
