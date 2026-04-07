import Navbar from "./Navbar";
import CourseList from "./CourseList";

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <section className="hero-section" id="home">
          <div className="hero-copy">
            <span className="hero-badge">Career-focused learning platform</span>
            <h1>Build real skills for tech jobs, not just certificates.</h1>
            <p>
              Learn frontend, backend, and product-ready development with guided
              lessons, practical projects, and mentor-backed roadmaps.
            </p>

            <div className="hero-actions">
              <a className="primary-action" href="#programs">
                Explore Programs
              </a>
              <a className="secondary-action" href="#free-classes">
                View Free Classes
              </a>
            </div>

            <div className="hero-metrics">
              <a className="metric-link" href="#programs">
                <strong>25k+</strong>
                <span>Learners enrolled</span>
              </a>
              <a className="metric-link" href="#free-classes">
                <strong>120+</strong>
                <span>Hands-on lessons</span>
              </a>
              <a className="metric-link" href="#mentors">
                <strong>4.8/5</strong>
                <span>Student satisfaction</span>
              </a>
            </div>
          </div>

          <div className="hero-panel">
            <a className="hero-card hero-card-highlight" href="#programs">
              <p>Top program</p>
              <h3>Full Stack Web Development</h3>
              <span>24-week guided path with projects, mock interviews, and placement prep.</span>
            </a>

            <div className="hero-card-grid">
              <a className="hero-card" href="#mentors">
                <strong>Live mentorship</strong>
                <span>Weekly doubt-solving with experts</span>
              </a>
              <a className="hero-card" href="#contact">
                <strong>Industry projects</strong>
                <span>Portfolio work for resume-ready proof</span>
              </a>
            </div>
          </div>
        </section>

        <section className="value-strip">
          <a href="#programs">
            <strong>Structured roadmaps</strong>
            <span>Start from basics and progress to advanced skills.</span>
          </a>
          <a href="#free-classes">
            <strong>Beginner-friendly</strong>
            <span>Simple explanations, practice tasks, and revision support.</span>
          </a>
          <a href="#contact">
            <strong>Job-oriented outcomes</strong>
            <span>Projects and concepts aligned with hiring expectations.</span>
          </a>
        </section>

        <section className="catalog-section" id="programs">
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

        <section className="info-section" id="free-classes">
          <div className="section-heading">
            <span>Free classes</span>
            <h2>Start with guided sessions before committing to a full track</h2>
            <p>
              Explore beginner lessons, coding practice, and roadmap sessions to
              see how the platform teaches.
            </p>
          </div>

          <div className="info-grid">
            <a className="info-card" href="#html-foundations">
              <strong>HTML Starter Session</strong>
              <span>Understand tags, structure, and semantic page layout in one guided class.</span>
            </a>
            <a className="info-card" href="#css-mastery">
              <strong>Responsive CSS Workshop</strong>
              <span>Learn flexbox, spacing, and mobile-friendly design basics.</span>
            </a>
            <a className="info-card" href="#javascript-bootcamp">
              <strong>JavaScript Logic Demo</strong>
              <span>Practice variables, conditions, loops, and DOM updates live.</span>
            </a>
          </div>
        </section>

        <section className="info-section" id="mentors">
          <div className="section-heading">
            <span>Mentors</span>
            <h2>Learn with instructors who guide projects and interview prep</h2>
            <p>
              Every cohort gets feedback, doubt-clearing sessions, and career support
              from experienced developers.
            </p>
          </div>

          <div className="info-grid">
            <a className="info-card" href="#contact">
              <strong>Weekly live support</strong>
              <span>Ask questions, review code, and stay consistent with expert guidance.</span>
            </a>
            <a className="info-card" href="#contact">
              <strong>Project reviews</strong>
              <span>Get practical feedback on portfolio projects before you apply for roles.</span>
            </a>
            <a className="info-card" href="#contact">
              <strong>Career coaching</strong>
              <span>Prepare for resumes, mock interviews, and job-ready skill presentation.</span>
            </a>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="section-heading">
            <span>Contact</span>
            <h2>Ready to enroll or talk to an advisor?</h2>
            <p>
              Choose your course, ask about pricing, or request a callback from the
              team to get started.
            </p>
          </div>

          <div className="contact-panel">
            <a className="contact-card" href="mailto:admissions@educore.com">
              <strong>Email admissions</strong>
              <span>admissions@educore.com</span>
            </a>
            <a className="contact-card" href="tel:+919999999999">
              <strong>Call the team</strong>
              <span>+91 99999 99999</span>
            </a>
            <a className="contact-card" href="#programs">
              <strong>Browse courses again</strong>
              <span>Jump back to the program catalog</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
