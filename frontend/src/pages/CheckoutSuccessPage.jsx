import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { confirmCheckout } from "../services/paymentService";

function CheckoutSuccessPage() {
  const [searchParams] = useSearchParams();
  const { token } = useAuth();
  const courseId = searchParams.get("courseId");
  const sessionId = searchParams.get("session_id");
  const [state, setState] = useState({
    loading: Boolean(courseId && sessionId),
    error: courseId && sessionId ? "" : "Missing payment session details.",
  });

  useEffect(() => {
    async function finalizeCheckout() {
      try {
        await confirmCheckout(courseId, sessionId, token);
        setState({ loading: false, error: "" });
      } catch (error) {
        setState({ loading: false, error: error.message });
      }
    }

    if (courseId && sessionId && token) {
      finalizeCheckout();
    }
  }, [courseId, sessionId, token]);

  return (
    <main className="section-shell flex min-h-[70vh] items-center justify-center py-16">
      <div className="glass-card max-w-2xl space-y-5 p-10 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-300" />
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Payment success</p>
        <h1 className="text-4xl font-semibold">
          {state.loading ? "Finalizing your enrollment..." : "You’re officially enrolled."}
        </h1>
        <p className="text-sm leading-7 text-slate-300">
          {state.error
            ? state.error
            : "Your payment has been recorded and the course has been added to your dashboard."}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/dashboard" className="primary-button">
            Open dashboard
          </Link>
          {courseId && (
            <Link to={`/courses/${courseId}`} className="glass-button">
              View course
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}

export default CheckoutSuccessPage;
