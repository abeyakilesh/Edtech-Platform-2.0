import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AuthPage({ mode = "login" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: mode === "login" ? "student@educore.com" : "",
    password: mode === "login" ? "Password123!" : "",
  });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");

    try {
      if (mode === "login") {
        await login({ email: form.email, password: form.password });
      } else {
        await signup(form);
      }

      navigate(location.state?.from?.pathname || "/dashboard");
    } catch (submissionError) {
      setError(submissionError.message);
    } finally {
      setBusy(false);
    }
  }

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  return (
    <main className="section-shell py-12">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="glass-card space-y-6 p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">EduCore access</p>
          <h1 className="text-4xl font-semibold">
            {mode === "login" ? "Welcome back to your learning dashboard." : "Create your learning workspace."}
          </h1>
          <p className="text-sm leading-7 text-slate-300">
            Use the seeded accounts for quick testing or create a fresh student profile. Demo admin:
            <span className="block pt-3 font-medium text-white">admin@educore.com / Password123!</span>
          </p>
        </div>

        <div className="glass-card p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {mode === "signup" && (
              <div>
                <label className="mb-2 block text-sm text-slate-300">Full name</label>
                <input className="input-field" name="name" value={form.name} onChange={updateField} required />
              </div>
            )}
            <div>
              <label className="mb-2 block text-sm text-slate-300">Email</label>
              <input className="input-field" name="email" type="email" value={form.email} onChange={updateField} required />
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">Password</label>
              <input className="input-field" name="password" type="password" value={form.password} onChange={updateField} required />
            </div>
            {error && <p className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">{error}</p>}
            <button className="primary-button w-full" disabled={busy}>
              {busy ? "Please wait..." : mode === "login" ? "Login to EduCore" : "Create account"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default AuthPage;
