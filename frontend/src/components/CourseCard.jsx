import { motion } from "framer-motion";
import { BookOpen, Clock3, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/formatters";

function CourseCard({ course }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      className="glass-card overflow-hidden"
    >
      <div className={`relative h-52 bg-gradient-to-br ${course.accent}`}>
        <img src={course.thumbnail} alt={course.title} className="h-full w-full object-cover mix-blend-overlay opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
        <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white">
          {course.category}
        </div>
        <div className="absolute bottom-5 left-5 right-5">
          <h3 className="text-xl font-semibold text-white">{course.title}</h3>
          <p className="mt-2 text-sm text-slate-200">{course.difficulty} • {course.duration}</p>
        </div>
      </div>

      <div className="space-y-5 p-5">
        <p className="text-sm leading-7 text-slate-300">{course.description}</p>

        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
          <span className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-2">
            <BookOpen className="h-4 w-4 text-cyan-200" />
            {course.lessonsCount} lessons
          </span>
          <span className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-2">
            <Clock3 className="h-4 w-4 text-cyan-200" />
            {course.duration}
          </span>
          <span className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-2">
            <Star className="h-4 w-4 text-amber-300" />
            {course.rating}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm text-slate-400">Starts at</p>
            <p className="text-lg font-semibold">{formatCurrency(course.price)}</p>
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
