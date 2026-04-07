// importing the Course component so we can reuse one card design many times
import Course from "./Course";

// importing images for each course card
import html from "./Image/html.png";
import css from "./Image/css.png";
import js from "./Image/js.png";
import react from "./Image/react.png";

// this component creates and displays the full course list
function CourseList() {
  const courses = [
    {
      id: 1,
      name: "HTML Foundations",
      price: 99,
      image: html,
      rating: 4.7,
      level: "Beginner",
      lessons: "18 lessons",
      description: "Create clean page structures and understand semantic web building blocks.",
      login: true,
    },
    {
      id: 2,
      name: "CSS Mastery",
      price: 299,
      image: css,
      rating: 4.8,
      level: "Beginner to Intermediate",
      lessons: "24 lessons",
      description: "Design responsive layouts, polished interfaces, and production-ready components.",
      login: true,
    },
    {
      id: 3,
      name: "JavaScript Bootcamp",
      price: 499,
      image: js,
      rating: 4.9,
      level: "Intermediate",
      lessons: "32 lessons",
      description: "Learn core logic, DOM interaction, APIs, and modern JavaScript practices.",
      login: true,
    },
    {
      id: 4,
      name: "React Development",
      price: 799,
      image: react,
      rating: 4.9,
      level: "Intermediate",
      lessons: "28 lessons",
      description: "Build fast single-page apps with reusable components and state-driven UI.",
      login: true,
    },
    {
      id: 5,
      name: "Node.js Backend",
      price: 999,
      image: react,
      rating: 4.8,
      level: "Advanced",
      lessons: "30 lessons",
      description: "Create scalable servers, APIs, and database-backed applications for real products.",
      login: true,
    },
  ];

  courses.sort((a, b) => a.price - b.price);

  const courseList = courses.map((course) => (
    <Course
      key={course.id}
      name={course.name}
      price={course.price}
      image={course.image}
      rating={course.rating}
      level={course.level}
      lessons={course.lessons}
      description={course.description}
      login={course.login}
    />
  ));

  return (
    <div className="course-list">{courseList}</div>
  );
}

export default CourseList;
