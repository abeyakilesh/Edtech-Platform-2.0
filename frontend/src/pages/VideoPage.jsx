import { ChevronRight, CircleCheckBig, NotebookPen } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";
import { useAuth } from "../context/AuthContext";
import { fetchCourse } from "../services/courseService";
import { updateProgress } from "../services/progressService";

function VideoPage() {
  const { courseId, moduleId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [course, setCourse] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCourse(courseId, token).then(setCourse).catch(() => setCourse(null));
  }, [courseId, token]);

  const modules = course?.modules || [];
  const currentIndex = modules.findIndex((item) => item._id === moduleId);
  const currentModule = currentIndex >= 0 ? modules[currentIndex] : modules[0];
  const nextModule = currentIndex >= 0 ? modules[currentIndex + 1] : null;

  async function markComplete() {
    if (!currentModule) return;

    setSaving(true);
    try {
      await updateProgress({ courseId, moduleId: currentModule._id, markComplete: true }, token);

      if (nextModule) {
        navigate(`/learn/${courseId}/${nextModule._id}`);
      } else {
        navigate(`/quiz/${courseId}`);
      }
    } finally {
      setSaving(false);
    }
  }

  if (!course || !currentModule) {
    return <main className="section-shell py-16 text-slate-300">Loading lesson...</main>;
  }

  return (
    <main className="section-shell grid gap-8 pb-16 pt-10 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="space-y-6">
        <VideoPlayer title={currentModule.title} videoUrl={currentModule.videoUrl} summary={currentModule.summary} />
        <div className="flex flex-wrap gap-4">
          <button onClick={markComplete} className="primary-button gap-2" disabled={saving}>
            <CircleCheckBig className="h-4 w-4" />
            {saving ? "Saving..." : nextModule ? "Complete and play next" : "Complete and go to quiz"}
          </button>
          <Link to={`/quiz/${courseId}`} className="glass-button gap-2">
            <NotebookPen className="h-4 w-4" />
            Open quiz
          </Link>
        </div>
      </div>

      <aside className="glass-card p-6">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Course navigator</p>
        <h2 className="mt-3 text-2xl font-semibold">{course.title}</h2>
        <div className="mt-6 space-y-3">
          {modules.map((module, index) => (
            <Link
              key={module._id}
              to={`/learn/${courseId}/${module._id}`}
              className={`flex items-center justify-between rounded-2xl border px-4 py-4 transition ${
                module._id === currentModule._id
                  ? "border-cyan-300/40 bg-cyan-400/10"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              }`}
            >
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Lesson {index + 1}</p>
                <p className="mt-2 text-sm font-semibold">{module.title}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </Link>
          ))}
        </div>
      </aside>
    </main>
  );
}

export default VideoPage;
