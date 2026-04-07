import { motion } from "framer-motion";
import { ArrowRight, BookCheck, Clock4, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import { useAuth } from "../context/AuthContext";
import { downloadCertificate } from "../services/certificateService";
import { fetchDashboardOverview } from "../services/progressService";

function DashboardPage() {
  const { token, user } = useAuth();
  const [overview, setOverview] = useState({
    enrolledCourses: [],
    certificates: [],
    recentActivity: [],
    stats: { enrolledCount: 0, averageProgress: 0 },
  });

  useEffect(() => {
    fetchDashboardOverview(token).then(setOverview).catch(() => {});
  }, [token]);

  const [firstCourse] = overview.enrolledCourses;

  return (
    <main className="w-full pb-24 pt-8">
      <section className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="glass-card grid gap-10 border-x-0 border-white/8 bg-white/[0.08] p-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:p-10"
        >
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Student dashboard</p>
          <h1 className="text-4xl font-semibold tracking-wide md:text-5xl">Welcome back, {user?.name}.</h1>
          <p className="max-w-3xl text-sm leading-8 text-slate-300 md:text-base">
            Track enrolled programs, resume your last lesson, and monitor quiz-backed progress in one workspace.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { label: "Enrolled", value: overview.stats.enrolledCount, icon: BookCheck },
            { label: "Avg. progress", value: `${overview.stats.averageProgress}%`, icon: Clock4 },
            { label: "Mode", value: user?.role, icon: Sparkles },
          ].map(({ label, value, icon: Icon }, index) => (
            <motion.div
              key={label}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={`interactive-lift border border-white/8 bg-white/5 p-5 ${index === 1 ? "md:translate-y-8" : ""}`}
            >
              <Icon className="h-5 w-5 text-cyan-200" />
              <p className="mt-4 text-xs uppercase tracking-[0.28em] text-slate-400">{label}</p>
              <p className="mt-2 text-2xl font-semibold tracking-wide">{value}</p>
            </motion.div>
          ))}
        </div>
        </motion.div>
      </section>

      {firstCourse && (
        <section className="section-shell py-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="glass-card flex flex-col gap-8 border-white/8 bg-white/[0.08] p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10"
          >
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Continue learning</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-wide">{firstCourse.course?.title}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-8 text-slate-300">{firstCourse.course?.description}</p>
          </div>
          <Link
            to={
              firstCourse.lastModuleId
                ? `/learn/${firstCourse.course?._id}/${firstCourse.lastModuleId}`
                : `/courses/${firstCourse.course?._id}`
            }
            className="primary-button gap-2"
          >
            Resume now
            <ArrowRight className="h-4 w-4" />
          </Link>
          </motion.div>
        </section>
      )}

      <section className="section-shell grid gap-8 py-10 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-8">
        {overview.enrolledCourses.map((item, index) => (
          <motion.div
            key={item.course?._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            whileHover={{ y: -8, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className={`glass-card interactive-lift border-white/8 bg-white/[0.08] p-6 md:p-7 ${index % 2 === 1 ? "xl:translate-x-8" : ""}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-cyan-200">{item.course?.category}</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-wide">{item.course?.title}</h3>
              </div>
              <span className="border-l border-cyan-300/40 bg-white/10 px-3 py-2 text-xs uppercase tracking-[0.22em] text-slate-200">{item.course?.difficulty}</span>
            </div>
            <p className="mt-4 text-sm leading-8 text-slate-300">{item.course?.description}</p>
            <div className="mt-6">
              <ProgressBar value={item.progress} />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to={`/courses/${item.course?._id}`} className="glass-button">
                View details
              </Link>
              <Link to={`/quiz/${item.course?._id}`} className="primary-button">
                Retake quiz
              </Link>
              {item.progress >= 100 && (
                <button
                  className="glass-button"
                  onClick={() => downloadCertificate(item.course?._id, token)}
                >
                  Download certificate
                </button>
              )}
            </div>
          </motion.div>
        ))}
        </div>

        <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          className="glass-card border-white/8 bg-white/[0.08] p-6 md:p-7 xl:-translate-y-4"
        >
          <h2 className="text-2xl font-semibold tracking-wide">Certificates</h2>
          <div className="mt-6 space-y-4">
            {overview.certificates.length === 0 && (
              <p className="text-sm text-slate-300">Complete a course to unlock certificates.</p>
            )}
            {overview.certificates.map((certificate) => (
              <div
                key={certificate.courseId}
                className="flex items-center justify-between gap-4 border border-white/8 bg-white/5 px-4 py-4"
              >
                <span>{certificate.title}</span>
                <button
                  className="glass-button"
                  onClick={() => downloadCertificate(certificate.courseId, token)}
                >
                  Download PDF
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          className="glass-card border-white/8 bg-slate-950/55 p-6 md:p-7 xl:translate-x-8"
        >
          <h2 className="text-2xl font-semibold tracking-wide">Recent activity</h2>
          <div className="mt-6 space-y-4">
            {overview.recentActivity.length === 0 && (
              <p className="text-sm text-slate-300">Your purchases and learning milestones will appear here.</p>
            )}
            {overview.recentActivity.map((activity, index) => (
              <div key={`${activity.title}-${index}`} className="border border-white/8 bg-white/5 px-4 py-4">
                <p className="font-medium">{activity.title}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.25em] text-cyan-200">{activity.type}</p>
                <p className="mt-2 text-sm text-slate-300">
                  {new Date(activity.createdAt).toLocaleString("en-IN")}
                  {activity.amount ? ` • ₹${activity.amount}` : ""}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
        </div>
      </section>
    </main>
  );
}

export default DashboardPage;
