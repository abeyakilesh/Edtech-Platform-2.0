import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, ChartNoAxesColumn, PlayCircle, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import { useAuth } from "../context/AuthContext";
import { fetchCourses } from "../services/courseService";

function HomePage() {
  const [courses, setCourses] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    fetchCourses(token)
      .then((data) => setCourses(data.slice(0, 6)))
      .catch(() => setCourses([]));
  }, [token]);

  return (
    <main className="section-shell space-y-16 pb-16 pt-10">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <span className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">
            Premium EdTech Platform
          </span>
          <div className="space-y-5">
            <h1 className="max-w-3xl text-5xl font-semibold leading-tight sm:text-6xl">
              Learn with clarity, ship with confidence, and track every milestone.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              EduCore combines structured courses, live-ready projects, quizzes, and progress intelligence in a premium learning environment inspired by the best modern product experiences.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link to="/courses" className="primary-button gap-2">
              Explore Courses
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/signup" className="glass-button gap-2">
              Start Free Account
              <PlayCircle className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "10 demo tracks", value: "Job-aligned catalog" },
              { label: "3-5 lessons", value: "Per course module flow" },
              { label: "Instant quizzes", value: "Realtime scoring" },
            ].map((item) => (
              <div key={item.label} className="glass-card p-5">
                <p className="text-sm font-semibold text-white">{item.label}</p>
                <p className="mt-2 text-sm text-slate-300">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card relative overflow-hidden p-6"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-transparent to-violet-500/20" />
          <div className="relative space-y-5">
            <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-950/40 p-5">
              <div>
                <p className="text-sm text-slate-300">Student momentum</p>
                <p className="mt-2 text-3xl font-semibold">82% average completion</p>
              </div>
              <ChartNoAxesColumn className="h-10 w-10 text-cyan-200" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <BadgeCheck className="mb-4 h-8 w-8 text-emerald-300" />
                <p className="font-semibold">Role-based learning</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  Students progress through modules while admins manage courses, quizzes, and learners.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <Sparkles className="mb-4 h-8 w-8 text-violet-300" />
                <p className="font-semibold">Premium UI</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  Glassmorphic surfaces, soft gradients, and focused spacing built for a startup-quality feel.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Featured catalog</p>
            <h2 className="mt-3 text-3xl font-semibold">Explore guided learning tracks</h2>
          </div>
          <Link to="/courses" className="glass-button">
            View full catalog
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default HomePage;
