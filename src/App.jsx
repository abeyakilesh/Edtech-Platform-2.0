import Navbar from "./Navbar";
import CourseList from "./CourseList";

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <span className="hero-badge">Career-focused learning platform</span>
            <h1>Build real skills for tech jobs, not just certificates.</h1>
            <p>
              Learn frontend, backend, and product-ready development with guided
              lessons, practical projects, and mentor-backed roadmaps.
            </p>

            <div className="hero-actions">
              <button className="primary-action">Explore Programs</button>
              <button className="secondary-action">View Free Classes</button>
            </div>

            <div className="hero-metrics">
              <div>
                <strong>25k+</strong>
                <span>Learners enrolled</span>
              </div>
              <div>
                <strong>120+</strong>
                <span>Hands-on lessons</span>
              </div>
              <div>
                <strong>4.8/5</strong>
                <span>Student satisfaction</span>
              </div>
            </div>
          </div>

          <div className="hero-panel">
            <div className="hero-card hero-card-highlight">
              <p>Top program</p>
              <h3>Full Stack Web Development</h3>
              <span>24-week guided path with projects, mock interviews, and placement prep.</span>
            </div>

            <div className="hero-card-grid">
              <div className="hero-card">
                <strong>Live mentorship</strong>
                <span>Weekly doubt-solving with experts</span>
              </div>
              <div className="hero-card">
                <strong>Industry projects</strong>
                <span>Portfolio work for resume-ready proof</span>
              </div>
            </div>
          </div>
        </section>

        <section className="value-strip">
          <div>
            <strong>Structured roadmaps</strong>
            <span>Start from basics and progress to advanced skills.</span>
          </div>
          <div>
            <strong>Beginner-friendly</strong>
            <span>Simple explanations, practice tasks, and revision support.</span>
          </div>
          <div>
            <strong>Job-oriented outcomes</strong>
            <span>Projects and concepts aligned with hiring expectations.</span>
          </div>
        </section>

        <section className="catalog-section">
          <div className="section-heading">
            <span>Popular courses</span>
            <h2>Choose a learning track that moves you forward</h2>
            <p>
              Start with a focused course or combine multiple tracks to build a
              complete developer skillset.
            </p>
          </div>

          <CourseList />
        </section>
      </main>
    </div>
  );
}

export default App;
