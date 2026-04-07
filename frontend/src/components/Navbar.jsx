import { motion } from "framer-motion";
import { BookOpen, GraduationCap, LogOut, ShieldCheck } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { initials } from "../utils/formatters";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Courses", to: "/courses" },
  { label: "Dashboard", to: "/dashboard" },
];

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-4 z-50 section-shell pt-4"
    >
      <div className="glass-card flex items-center justify-between gap-4 px-5 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 to-violet-500 text-slate-950">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-bold">EduCore</p>
            <p className="text-xs text-slate-300">Premium learning for modern careers</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-2xl px-4 py-2 text-sm font-medium transition ${
                  isActive ? "bg-white/12 text-white" : "text-slate-300 hover:bg-white/8 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          {user?.role === "admin" && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `rounded-2xl px-4 py-2 text-sm font-medium transition ${
                  isActive ? "bg-white/12 text-white" : "text-slate-300 hover:bg-white/8 hover:text-white"
                }`
              }
            >
              Admin
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <div className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 md:flex">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-sm font-bold">
                  {initials(user?.name)}
                </div>
                <div>
                  <p className="text-sm font-semibold">{user?.name}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">{user?.role}</p>
                </div>
              </div>
              <button onClick={logout} className="glass-button gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="glass-button gap-2">
                <BookOpen className="h-4 w-4" />
                Login
              </Link>
              <Link to="/signup" className="primary-button gap-2">
                <ShieldCheck className="h-4 w-4" />
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
}

export default Navbar;
