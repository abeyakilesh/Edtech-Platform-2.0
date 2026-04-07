import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  ChartNoAxesColumn,
  Layers3,
  MoveRight,
  PlayCircle,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { fetchCourses } from "../services/courseService";
import { formatCurrency } from "../utils/formatters";

const heroCards = [
  {
    title: "React for Beginners",
    tag: "Live Path",
    tone: "from-cyan-400/80 via-sky-500/80 to-blue-600/90",
    drift: { x: [-2, -10, -2, 5, -2], y: [-2, -10, -2, 4, -2] },
  },
  {
    title: "AI Fundamentals",
    tag: "Trending",
    tone: "from-violet-400/80 via-fuchsia-500/80 to-pink-500/90",
    drift: { x: [2, 10, 2, -4, 2], y: [-2, -10, -2, 5, -2] },
  },
  {
    title: "Cloud Basics",
    tag: "Career Track",
    tone: "from-emerald-300/80 via-teal-500/80 to-cyan-600/90",
    drift: { x: [-2, -10, -2, 4, -2], y: [2, 10, 2, -5, 2] },
  },
  {
    title: "JavaScript Mastery",
    tag: "Top Rated",
    tone: "from-amber-300/80 via-orange-500/80 to-rose-500/90",
    drift: { x: [2, 10, 2, -4, 2], y: [2, 10, 2, -5, 2] },
  },
];

const featureRows = [
  {
    title: "Interactive learning feels more like product flow than a textbook.",
    body:
      "Every lesson, quiz, and resume point is designed like a guided software experience so students stay oriented and motivated.",
    eyebrow: "Learning flow",
    icon: Layers3,
    align: "right",
  },
  {
    title: "Progress surfaces stay visible without crowding the screen.",
    body:
      "EduCore balances glass, solid panels, and motion to keep dashboards readable while still feeling premium and futuristic.",
    eyebrow: "Clarity at scale",
    icon: ChartNoAxesColumn,
    align: "left",
  },
];

const trustStats = [
  { label: "Active learners", value: "25k+" },
  { label: "Interactive lessons", value: "480+" },
  { label: "Completion uplift", value: "82%" },
];

function StatCounter({ value, label, isDark }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      whileHover={{ y: -6, scale: 1.03 }}
      className={`interactive-lift border p-6 ${
        isDark ? "border-white/10 bg-white/[0.08]" : "border-slate-900/[0.08] bg-white/70"
      }`}
    >
      <p className={`text-4xl font-semibold tracking-wide md:text-5xl ${isDark ? "text-white" : "text-slate-950"}`}>{value}</p>
      <p className={`mt-3 text-xs uppercase tracking-[0.28em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>{label}</p>
    </motion.div>
  );
}

function HomePage() {
  const [courses, setCourses] = useState([]);
  const { token } = useAuth();
  const { isDark } = useTheme();
  const stripRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: stripRef,
    offset: ["start end", "end start"],
  });

  const xOne = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const xTwo = useTransform(scrollYProgress, [0, 1], ["-6%", "10%"]);

  useEffect(() => {
    fetchCourses(token)
      .then((data) => setCourses(data.slice(0, 6)))
      .catch(() => setCourses([]));
  }, [token]);

  const featuredCourses = courses.slice(0, 4);

  return (
    <main className={`w-full overflow-hidden pb-24 ${isDark ? "text-white" : "text-slate-950"}`}>
      <section className="relative min-h-screen w-full px-6 pb-16 pt-12 lg:px-20 xl:px-24">
        <div className={`absolute inset-0 ${isDark ? "bg-[radial-gradient(circle_at_10%_10%,rgba(34,211,238,0.18),transparent_22%),radial-gradient(circle_at_90%_8%,rgba(139,92,246,0.18),transparent_24%),linear-gradient(180deg,rgba(4,9,24,0.88),rgba(6,16,34,0.62),rgba(5,9,21,0))]" : "bg-[radial-gradient(circle_at_10%_10%,rgba(8,145,178,0.16),transparent_22%),radial-gradient(circle_at_90%_8%,rgba(124,58,237,0.12),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.92),rgba(241,247,255,0.64),rgba(237,243,250,0))]"}`} />
        <div className={`absolute left-[6%] top-16 h-52 w-52 blur-3xl ${isDark ? "bg-cyan-400/12" : "bg-cyan-400/16"}`} />
        <div className={`absolute right-[8%] top-8 h-72 w-72 blur-3xl ${isDark ? "bg-violet-500/14" : "bg-violet-500/10"}`} />

        <div className="relative grid min-h-[84vh] items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-10"
          >
            <span className={`inline-flex border px-4 py-2 text-xs font-semibold uppercase tracking-[0.34em] ${isDark ? "border-cyan-300/20 bg-cyan-400/10 text-cyan-200" : "border-cyan-500/20 bg-cyan-500/10 text-cyan-700"}`}>
              Future-ready learning
            </span>

            <div className="space-y-6">
              <h1 className="max-w-5xl text-6xl font-semibold leading-[0.88] tracking-wide md:text-7xl xl:text-[6.6rem]">
                Learn Smarter. Build Faster.
              </h1>
              <p className={`max-w-2xl text-lg leading-8 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                EduCore helps you master real-world skills with interactive courses, immersive progress systems, and product-grade learning journeys.
              </p>
            </div>

            <div className="flex flex-wrap gap-5">
              <Link to="/courses" className="primary-button gap-2">
                Start Learning
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/signup" className="glass-button gap-2">
                Explore the platform
                <PlayCircle className="h-4 w-4" />
              </Link>
            </div>

            <div className="flex flex-wrap gap-5 pt-4">
              {[
                { icon: BookOpen, text: "Interactive lessons" },
                { icon: Trophy, text: "Trackable wins" },
                { icon: Sparkles, text: "Premium UI" },
              ].map(({ icon: Icon, text }, index) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.15 + index * 0.08 }}
                  whileHover={{ y: -6, scale: 1.03 }}
                  className={`interactive-lift border px-4 py-3 ${isDark ? "border-white/10 bg-white/[0.08]" : "border-slate-900/[0.08] bg-white/70"}`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${isDark ? "text-cyan-200" : "text-cyan-700"}`} />
                    <span className={`text-sm tracking-wide ${isDark ? "text-slate-200" : "text-slate-700"}`}>{text}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: "easeOut" }}
            className="relative w-full"
          >
            <div
              className={`relative overflow-hidden rounded-md border p-5 backdrop-blur-lg ${
                isDark
                  ? "border-white/10 bg-white/[0.08]"
                  : "border-slate-900/10 bg-white/[0.42]"
              }`}
            >
              <div
                className={`absolute inset-3 rounded-md ${
                  isDark ? "bg-slate-950/48" : "bg-white/[0.72]"
                }`}
              />

              <div className="relative grid gap-6 sm:grid-cols-2">
              {heroCards.map((card, index) => (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{
                    opacity: 1,
                    y: card.drift.y,
                    x: card.drift.x,
                  }}
                  transition={{
                    opacity: { duration: 0.5, delay: 0.22 + index * 0.08 },
                    x: {
                      duration: 7.2 + index * 0.45,
                      delay: 0.22 + index * 0.08,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    y: {
                      duration: 7.2 + index * 0.45,
                      delay: 0.22 + index * 0.08,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  whileHover={{ y: -10, scale: 1.03, boxShadow: "0 18px 50px rgba(34,211,238,0.18)" }}
                  whileTap={{ scale: 0.96 }}
                  className={`overflow-hidden rounded-md border shadow-2xl backdrop-blur-lg ${
                    isDark
                      ? "border-white/15 bg-white/[0.12] shadow-cyan-950/30"
                      : "border-slate-900/12 bg-white/[0.78] shadow-slate-400/30"
                  } ${index === 1 || index === 2 ? "sm:translate-y-8" : ""}`}
                >
                  <div className={`h-28 w-full rounded-t-md bg-gradient-to-br ${card.tone}`} />
                  <div
                    className={`space-y-3 border-t p-5 ${
                      isDark ? "border-white/10 bg-slate-950/72" : "border-slate-900/10 bg-white/[0.92]"
                    }`}
                  >
                    <p className={`text-[11px] uppercase tracking-[0.3em] ${isDark ? "text-cyan-200" : "text-cyan-700"}`}>{card.tag}</p>
                    <h3 className="text-xl font-semibold tracking-wide">{card.title}</h3>
                    <p className={`text-sm leading-7 ${isDark ? "text-slate-300" : "text-slate-600"}`}>Hands-on projects, modular paths, and progress that stays visible.</p>
                  </div>
                </motion.article>
              ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="w-full px-6 py-20 lg:px-20 xl:px-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="flex items-end justify-between gap-8"
        >
          <div>
            <p className={`text-xs uppercase tracking-[0.32em] ${isDark ? "text-cyan-200" : "text-cyan-700"}`}>Floating showcase</p>
            <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-wide md:text-5xl">
              Courses presented like a fluid product surface, not a basic catalog grid.
            </h2>
          </div>
        </motion.div>

        <div className="mt-12 grid gap-6 xl:grid-cols-4">
          {featuredCourses.map((course, index) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              whileHover={{ y: -14, scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className={`overflow-hidden border ${isDark ? "border-white/10 bg-white/10" : "border-slate-900/10 bg-white/[0.72]"} backdrop-blur-lg ${
                index % 2 === 1 ? "xl:translate-y-10" : ""
              }`}
            >
              <div className={`h-40 bg-gradient-to-br ${course.accent}`} />
              <div className={`space-y-4 p-5 ${isDark ? "bg-slate-950/58" : "bg-white/[0.82]"}`}>
                <div className="flex items-center justify-between gap-3">
                  <span className={`text-[11px] uppercase tracking-[0.3em] ${isDark ? "text-cyan-200" : "text-cyan-700"}`}>{course.category}</span>
                  <span className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>{course.rating} ★</span>
                </div>
                <h3 className="text-2xl font-semibold tracking-wide">{course.title}</h3>
                <p className={`text-sm leading-8 ${isDark ? "text-slate-300" : "text-slate-600"}`}>{course.description}</p>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className={`text-[11px] uppercase tracking-[0.3em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>Starts at</p>
                    <p className="mt-2 text-lg font-semibold">{formatCurrency(course.price)}</p>
                  </div>
                  <Link to={`/courses/${course._id}`} className="glass-button gap-2">
                    View
                    <MoveRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="w-full px-6 py-20 lg:px-20 xl:px-24">
        <div className="space-y-20">
          {featureRows.map((row, index) => {
            const Icon = row.icon;
            const imagePanel = (
              <motion.div
                initial={{ opacity: 0, y: 46 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`relative min-h-[320px] overflow-hidden border ${isDark ? "border-white/10 bg-white/10" : "border-slate-900/10 bg-white/[0.72]"} backdrop-blur-lg`}
              >
                <div className={`absolute inset-0 ${isDark ? "bg-[radial-gradient(circle_at_25%_20%,rgba(34,211,238,0.2),transparent_26%),radial-gradient(circle_at_80%_80%,rgba(139,92,246,0.18),transparent_32%),linear-gradient(160deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]" : "bg-[radial-gradient(circle_at_25%_20%,rgba(34,211,238,0.16),transparent_26%),radial-gradient(circle_at_80%_80%,rgba(139,92,246,0.12),transparent_32%),linear-gradient(160deg,rgba(255,255,255,0.72),rgba(255,255,255,0.35))]"}`} />
                <div className="absolute left-8 top-8">
                  <Icon className={`h-9 w-9 ${isDark ? "text-cyan-200" : "text-cyan-700"}`} />
                </div>
                <div className={`absolute bottom-0 left-0 right-0 border-t p-8 ${isDark ? "border-white/10 bg-slate-950/58" : "border-slate-900/10 bg-white/[0.74]"}`}>
                  <p className={`text-[11px] uppercase tracking-[0.32em] ${isDark ? "text-cyan-200" : "text-cyan-700"}`}>Experience layer</p>
                  <p className={`mt-3 text-sm leading-8 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                    Motion, clarity, and progression are designed together so the product feels premium without losing readability.
                  </p>
                </div>
              </motion.div>
            );

            const textPanel = (
              <motion.div
                initial={{ opacity: 0, y: 46 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                className={`space-y-6 ${index % 2 === 0 ? "lg:pl-8" : "lg:pr-8"}`}
              >
                <p className={`text-xs uppercase tracking-[0.32em] ${isDark ? "text-cyan-200" : "text-cyan-700"}`}>{row.eyebrow}</p>
                <h3 className="max-w-3xl text-4xl font-semibold tracking-wide md:text-5xl">{row.title}</h3>
                <p className={`max-w-2xl text-base leading-8 ${isDark ? "text-slate-300" : "text-slate-600"}`}>{row.body}</p>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex border px-4 py-2 text-xs uppercase tracking-[0.26em] ${isDark ? "border-white/10 bg-white/[0.08] text-slate-200" : "border-slate-900/10 bg-white/70 text-slate-700"}`}>Scroll reveal enabled</span>
                  <span className={`inline-flex border px-4 py-2 text-xs uppercase tracking-[0.26em] ${isDark ? "border-white/10 bg-white/[0.08] text-slate-200" : "border-slate-900/10 bg-white/70 text-slate-700"}`}>Product-led spacing</span>
                </div>
              </motion.div>
            );

            return (
              <div key={row.title} className="grid items-center gap-12 lg:grid-cols-2">
                {row.align === "right" ? (
                  <>
                    {textPanel}
                    {imagePanel}
                  </>
                ) : (
                  <>
                    {imagePanel}
                    {textPanel}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section ref={stripRef} className="w-full overflow-hidden px-6 py-20 lg:px-20 xl:px-24">
        <motion.div style={{ x: xOne }} className="flex gap-6">
          {[0, 1, 2, 3].map((item) => (
            <div
              key={`strip-one-${item}`}
              className={`min-w-[22rem] border p-6 ${isDark ? "border-white/10 bg-white/10" : "border-slate-900/10 bg-white/[0.72]"} backdrop-blur-lg`}
            >
              <p className={`text-[11px] uppercase tracking-[0.3em] ${isDark ? "text-cyan-200" : "text-cyan-700"}`}>Interactive experience</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-wide">Fluid motion layer</h3>
              <p className={`mt-4 text-sm leading-8 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                Cards react to scroll and movement so the landing experience feels alive, guided, and product-first.
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div style={{ x: xTwo }} className="mt-6 flex gap-6">
          {[0, 1, 2].map((item) => (
            <div
              key={`strip-two-${item}`}
              className={`min-w-[26rem] border p-6 ${isDark ? "border-white/10 bg-slate-950/55" : "border-slate-900/10 bg-slate-100/85"} backdrop-blur-lg`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-700"}`}>Scroll-responsive cards</span>
                <Star className={`h-4 w-4 ${isDark ? "text-amber-300" : "text-amber-500"}`} />
              </div>
              <p className={`mt-4 text-sm leading-8 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                Use motion to build delight without relying on loud colors or childish visual tricks.
              </p>
            </div>
          ))}
        </motion.div>
      </section>

      <section className="w-full px-6 py-20 lg:px-20 xl:px-24">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-5"
          >
            <p className={`text-xs uppercase tracking-[0.32em] ${isDark ? "text-cyan-200" : "text-cyan-700"}`}>Trusted momentum</p>
            <h2 className="max-w-3xl text-4xl font-semibold tracking-wide md:text-5xl">Built to feel premium, but still focused on learner confidence.</h2>
          </motion.div>
          <div className="grid gap-5 md:grid-cols-3">
            {trustStats.map((stat) => (
              <StatCounter key={stat.label} value={stat.value} label={stat.label} isDark={isDark} />
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-6 py-20 lg:px-20 xl:px-24">
        <motion.div
          initial={{ opacity: 0, y: 44 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className={`relative overflow-hidden border px-8 py-14 md:px-12 ${isDark ? "border-white/10 bg-white/10" : "border-slate-900/10 bg-white/70"} backdrop-blur-lg`}
        >
          <div className={`absolute right-0 top-0 h-40 w-40 blur-3xl ${isDark ? "bg-violet-500/16" : "bg-violet-500/12"}`} />
          <div className={`absolute left-0 bottom-0 h-40 w-40 blur-3xl ${isDark ? "bg-cyan-400/14" : "bg-cyan-400/14"}`} />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-5">
              <p className={`text-xs uppercase tracking-[0.32em] ${isDark ? "text-cyan-200" : "text-cyan-700"}`}>Final call</p>
              <h2 className="max-w-4xl text-4xl font-semibold tracking-wide md:text-5xl">
                Join EduCore Now and turn learning into a fluid, high-signal product experience.
              </h2>
              <p className={`max-w-2xl text-base leading-8 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                Clean interfaces, sharp motion, and real course momentum designed for modern learners.
              </p>
            </div>
            <Link to="/signup" className="primary-button gap-2">
              Join EduCore Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

export default HomePage;
