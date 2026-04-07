import { CreditCard, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { fetchCourse } from "../services/courseService";
import { createCheckoutSession } from "../services/paymentService";
import { formatCurrency } from "../utils/formatters";

function CheckoutPage() {
  const { courseId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCourse(courseId, token).then(setCourse).catch(() => setCourse(null));
  }, [courseId, token]);

  async function handleCheckout() {
    setBusy(true);
    setError("");

    try {
      const session = await createCheckoutSession(courseId, token);
      window.location.href = session.checkoutUrl;
    } catch (checkoutError) {
      setError(checkoutError.message);
    } finally {
      setBusy(false);
    }
  }

  if (!course) {
    return <main className="section-shell py-16 text-slate-300">Loading checkout...</main>;
  }

  return (
    <main className="section-shell grid gap-8 pb-16 pt-10 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="glass-card space-y-6 p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Secure checkout</p>
        <h1 className="text-4xl font-semibold">Complete your enrollment for {course.title}</h1>
        <p className="text-sm leading-7 text-slate-300">
          EduCore uses a Stripe-ready payment flow. If Stripe keys are not configured yet, the app automatically falls back to a safe demo checkout path so you can keep building locally.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: CreditCard, label: "Stripe-ready payments" },
            { icon: ShieldCheck, label: "JWT protected purchase flow" },
            { icon: Sparkles, label: "Instant access after payment" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <Icon className="h-5 w-5 text-cyan-200" />
              <p className="mt-3 text-sm text-slate-200">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <aside className="glass-card space-y-6 p-8">
        <div className={`rounded-3xl bg-gradient-to-br ${course.accent} p-6`}>
          <p className="text-sm text-white/80">{course.category}</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">{course.title}</h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-slate-300">
            <span>Course price</span>
            <span>{formatCurrency(course.price)}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-slate-300">
            <span>Lessons</span>
            <span>{course.modules?.length || course.lessonsCount}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-slate-300">
            <span>Instructor</span>
            <span>{course.instructor}</span>
          </div>
        </div>
        {error && <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">{error}</div>}
        <button className="primary-button w-full justify-center" onClick={handleCheckout} disabled={busy}>
          {busy ? "Redirecting..." : `Pay ${formatCurrency(course.price)}`}
        </button>
        <button className="glass-button w-full justify-center" onClick={() => navigate(`/courses/${courseId}`)}>
          Back to course
        </button>
      </aside>
    </main>
  );
}

export default CheckoutPage;
