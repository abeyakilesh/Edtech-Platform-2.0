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
    <main className="section-shell space-y-8 pb-16 pt-10">
      <section className="glass-card grid gap-6 p-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Student dashboard</p>
          <h1 className="text-4xl font-semibold">Welcome back, {user?.name}.</h1>
          <p className="max-w-2xl text-sm leading-7 text-slate-300">
            Track enrolled programs, resume your last lesson, and monitor quiz-backed progress in one workspace.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Enrolled", value: overview.stats.enrolledCount, icon: BookCheck },
            { label: "Avg. progress", value: `${overview.stats.averageProgress}%`, icon: Clock4 },
            { label: "Mode", value: user?.role, icon: Sparkles },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <Icon className="h-5 w-5 text-cyan-200" />
              <p className="mt-4 text-sm text-slate-400">{label}</p>
              <p className="mt-2 text-2xl font-semibold">{value}</p>
            </div>
          ))}
        </div>
      </section>

      {firstCourse && (
        <section className="glass-card flex flex-col gap-5 p-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Continue learning</p>
            <h2 className="mt-3 text-2xl font-semibold">{firstCourse.course?.title}</h2>
            <p className="mt-2 text-sm text-slate-300">{firstCourse.course?.description}</p>
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
        </section>
      )}

      <section className="grid gap-6 lg:grid-cols-2">
        {overview.enrolledCourses.map((item) => (
          <div key={item.course?._id} className="glass-card p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-cyan-200">{item.course?.category}</p>
                <h3 className="mt-2 text-2xl font-semibold">{item.course?.title}</h3>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-2 text-xs text-slate-200">{item.course?.difficulty}</span>
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-300">{item.course?.description}</p>
            <div className="mt-5">
              <ProgressBar value={item.progress} />
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
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
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card p-6">
          <h2 className="text-2xl font-semibold">Certificates</h2>
          <div className="mt-5 space-y-3">
            {overview.certificates.length === 0 && (
              <p className="text-sm text-slate-300">Complete a course to unlock certificates.</p>
            )}
            {overview.certificates.map((certificate) => (
              <div
                key={certificate.courseId}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
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
        </div>

        <div className="glass-card p-6">
          <h2 className="text-2xl font-semibold">Recent activity</h2>
          <div className="mt-5 space-y-3">
            {overview.recentActivity.length === 0 && (
              <p className="text-sm text-slate-300">Your purchases and learning milestones will appear here.</p>
            )}
            {overview.recentActivity.map((activity, index) => (
              <div key={`${activity.title}-${index}`} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                <p className="font-medium">{activity.title}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.25em] text-cyan-200">{activity.type}</p>
                <p className="mt-2 text-sm text-slate-300">
                  {new Date(activity.createdAt).toLocaleString("en-IN")}
                  {activity.amount ? ` • ₹${activity.amount}` : ""}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default DashboardPage;
