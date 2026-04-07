import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main className="section-shell flex min-h-[60vh] items-center justify-center py-16">
      <div className="glass-card max-w-lg space-y-5 p-10 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">404</p>
        <h1 className="text-4xl font-semibold">That page drifted out of orbit.</h1>
        <p className="text-sm leading-7 text-slate-300">
          Head back to the homepage or jump straight into the course catalog.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/" className="primary-button">Home</Link>
          <Link to="/courses" className="glass-button">Courses</Link>
        </div>
      </div>
    </main>
  );
}

export default NotFoundPage;
