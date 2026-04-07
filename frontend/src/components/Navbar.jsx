import { motion } from "framer-motion";
import { BookOpen, GraduationCap, LogOut, MoonStar, ShieldCheck, SunMedium } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { initials } from "../utils/formatters";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Courses", to: "/courses" },
  { label: "Dashboard", to: "/dashboard" },
];

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 w-full px-4 py-4 lg:px-8 xl:px-10"
    >
      <div
        className={`glass-card flex w-full items-center justify-between gap-4 border-x-0 border-t-0 px-5 py-4 md:px-7 ${
          isDark ? "bg-slate-950/45" : "bg-white/[0.55] text-slate-900"
        }`}
      >
        <Link to="/" className="group flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center bg-gradient-to-br from-cyan-300 to-violet-500 text-slate-950 transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-105">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-bold tracking-wide">EduCore</p>
            <p className={`text-[11px] uppercase tracking-[0.28em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>Premium learning for modern careers</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 ease-out ${
                  isActive
                    ? isDark
                      ? "border-l border-cyan-300/40 bg-white/10 text-white"
                      : "border-l border-cyan-500/40 bg-slate-900/[0.06] text-slate-900"
                    : isDark
                      ? "text-slate-400 hover:-translate-y-1 hover:bg-white/5 hover:text-white"
                      : "text-slate-500 hover:-translate-y-1 hover:bg-slate-900/5 hover:text-slate-900"
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
                `px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 ease-out ${
                  isActive
                    ? isDark
                      ? "border-l border-cyan-300/40 bg-white/10 text-white"
                      : "border-l border-cyan-500/40 bg-slate-900/[0.06] text-slate-900"
                    : isDark
                      ? "text-slate-400 hover:-translate-y-1 hover:bg-white/5 hover:text-white"
                      : "text-slate-500 hover:-translate-y-1 hover:bg-slate-900/5 hover:text-slate-900"
                }`
              }
            >
              Admin
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <motion.button whileTap={{ scale: 0.95 }} onClick={toggleTheme} className="glass-button gap-2">
            {isDark ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
            {isDark ? "Light" : "Dark"}
          </motion.button>
          {isAuthenticated ? (
            <>
              <div className={`hidden items-center gap-3 border-l px-4 py-2 md:flex ${isDark ? "border-white/10 bg-white/5" : "border-slate-900/10 bg-slate-900/5"}`}>
                <div className={`flex h-10 w-10 items-center justify-center text-sm font-bold ${isDark ? "bg-white/10" : "bg-slate-900/[0.06]"}`}>
                  {initials(user?.name)}
                </div>
                <div>
                  <p className="text-sm font-semibold">{user?.name}</p>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-200">{user?.role}</p>
                </div>
              </div>
              <motion.button whileTap={{ scale: 0.95 }} onClick={logout} className="glass-button gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </motion.button>
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
