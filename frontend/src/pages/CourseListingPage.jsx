import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import CourseCard from "../components/CourseCard";
import { useAuth } from "../context/AuthContext";
import { fetchCourses } from "../services/courseService";

function CourseListingPage() {
  const [courses, setCourses] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const { token } = useAuth();

  useEffect(() => {
    fetchCourses(token).then(setCourses).catch(() => setCourses([]));
  }, [token]);

  const categories = useMemo(
    () => ["All", ...new Set(courses.map((course) => course.category))],
    [courses]
  );

  const filteredCourses = useMemo(
    () =>
      courses.filter((course) => {
        const matchesQuery =
          course.title.toLowerCase().includes(query.toLowerCase()) ||
          course.description.toLowerCase().includes(query.toLowerCase());
        const matchesCategory = category === "All" || course.category === category;
        return matchesQuery && matchesCategory;
      }),
    [courses, query, category]
  );

  return (
    <main className="section-shell space-y-8 pb-16 pt-10">
      <section className="glass-card space-y-6 p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Course catalog</p>
        <h1 className="text-4xl font-semibold">Browse premium learning programs</h1>
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              className="input-field pl-11"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by title or skill"
            />
          </label>
          <select className="input-field" value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => (
              <option key={item} className="bg-slate-900" value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </section>
    </main>
  );
}

export default CourseListingPage;
