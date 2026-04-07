import { motion } from "framer-motion";
import { BookOpen, Clock3, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/formatters";

function CourseCard({ course }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{ y: -10, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="glass-card interactive-lift group relative overflow-hidden border-white/8 bg-white/[0.08]"
    >
      <div className={`relative h-56 bg-gradient-to-br ${course.accent}`}>
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-full w-full object-cover mix-blend-overlay opacity-70 transition-all duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
        <div className="absolute left-5 top-5 border border-white/20 bg-slate-950/30 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.28em] text-white">
          {course.category}
        </div>
        <div className="absolute -bottom-4 right-0 h-24 w-24 bg-cyan-300/20 blur-3xl transition-all duration-500 group-hover:translate-x-[-8px]" />
        <div className="absolute bottom-6 left-5 right-5">
          <h3 className="text-2xl font-semibold tracking-wide text-white">{course.title}</h3>
          <p className="mt-2 text-sm tracking-wide text-slate-200">{course.difficulty} • {course.duration}</p>
        </div>
      </div>

      <div className="relative -mt-3 space-y-6 bg-slate-950/52 p-5">
        <p className="max-w-md text-sm leading-8 text-slate-300">{course.description}</p>

        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
          <span className="flex items-center gap-2 border-l border-cyan-300/40 bg-white/5 px-3 py-2">
            <BookOpen className="h-4 w-4 text-cyan-200" />
            {course.lessonsCount} lessons
          </span>
          <span className="flex items-center gap-2 border-l border-cyan-300/40 bg-white/5 px-3 py-2">
            <Clock3 className="h-4 w-4 text-cyan-200" />
            {course.duration}
          </span>
          <span className="flex items-center gap-2 border-l border-amber-300/40 bg-white/5 px-3 py-2">
            <Star className="h-4 w-4 text-amber-300" />
            {course.rating}
          </span>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">Starts at</p>
            <p className="mt-2 text-xl font-semibold tracking-wide">{formatCurrency(course.price)}</p>
          </div>
          <Link to={`/courses/${course._id}`} className="primary-button">
            View course
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default CourseCard;
