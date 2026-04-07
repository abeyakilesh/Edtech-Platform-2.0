import { CheckCircle2, Play, Sparkles, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import { useAuth } from "../context/AuthContext";
import { fetchCourse } from "../services/courseService";
import { updateProgress } from "../services/progressService";
import { formatCurrency } from "../utils/formatters";

function CourseDetailPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuth();
  const [course, setCourse] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetchCourse(courseId, token).then(setCourse).catch(() => setCourse(null));
  }, [courseId, token]);

  async function handleEnroll() {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: { pathname: `/courses/${courseId}` } } });
      return;
    }

    setBusy(true);
    try {
      await updateProgress({ courseId, completion: 0 }, token);
      navigate(`/learn/${courseId}/${course.modules?.[0]?._id}`);
    } finally {
      setBusy(false);
    }
  }

  if (!course) {
    return <main className="section-shell py-16 text-slate-300">Loading course details...</main>;
  }

  return (
    <main className="section-shell space-y-8 pb-16 pt-10">
      <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="glass-card overflow-hidden">
          <div className={`relative h-72 bg-gradient-to-br ${course.accent}`}>
            <img src={course.thumbnail} alt={course.title} className="h-full w-full object-cover opacity-60 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 space-y-3">
              <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-cyan-200">
                {course.category}
              </span>
              <h1 className="text-4xl font-semibold">{course.title}</h1>
              <p className="max-w-2xl text-slate-200">{course.description}</p>
            </div>
          </div>
          <div className="grid gap-5 p-8 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-400">Duration</p>
              <p className="mt-2 text-xl font-semibold">{course.duration}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-400">Lessons</p>
              <p className="mt-2 text-xl font-semibold">{course.modules?.length || course.lessonsCount}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-400">Instructor</p>
              <p className="mt-2 text-xl font-semibold">{course.instructor}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card space-y-5 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Enrollment</p>
            <p className="text-3xl font-semibold">{formatCurrency(course.price)}</p>
            <ProgressBar value={course.progress || 0} />
            <button onClick={handleEnroll} className="primary-button w-full" disabled={busy}>
              {busy ? "Preparing..." : course.progress ? "Resume learning" : "Enroll and start"}
            </button>
            {course.modules?.[0] && (
              <Link to={`/quiz/${courseId}`} className="glass-button w-full justify-center">
                Take course quiz
              </Link>
            )}
          </div>

          <div className="glass-card space-y-4 p-6">
            {[
              { icon: CheckCircle2, text: "3-5 guided video modules per course" },
              { icon: Play, text: "Autoplay next lesson-ready learning flow" },
              { icon: Trophy, text: "Instant quizzes with stored results" },
              { icon: Sparkles, text: "Dashboard and progress tracking included" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-200">
                <Icon className="h-4 w-4 text-cyan-200" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="glass-card p-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Module roadmap</p>
            <h2 className="mt-3 text-2xl font-semibold">Inside this course</h2>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          {course.modules?.map((module) => (
            <Link
              key={module._id}
              to={`/learn/${courseId}/${module._id}`}
              className="flex items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Lesson {module.order}</p>
                <p className="mt-2 text-lg font-semibold">{module.title}</p>
                <p className="mt-2 text-sm text-slate-300">{module.summary}</p>
              </div>
              <span className="rounded-full bg-cyan-400/10 px-3 py-2 text-xs text-cyan-200">{module.duration}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default CourseDetailPage;
