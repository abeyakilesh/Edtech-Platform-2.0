// importing the top navigation bar
import Navbar from "./Navbar";

// importing the component that shows all course cards
import CourseList from "./CourseList";

// App is the main component of this project
function App() {
  // returning the page structure
  return (
    <div>
      {/* showing the navigation bar at the top */}
      <Navbar />

      {/* showing the list of courses below the navbar */}
      <CourseList />
    </div>
  );
}

// exporting App so main.jsx can render it
export default App;
