import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createCourse, createModule, createQuiz, fetchCourses, fetchUsers } from "../services/courseService";

function AdminPanelPage() {
  const { token } = useAuth();
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("");
  const [courseForm, setCourseForm] = useState({
    title: "",
    slug: "",
    description: "",
    thumbnail: "",
    category: "Frontend",
    difficulty: "Beginner",
    duration: "6 weeks",
    instructor: "EduCore Team",
    price: 1499,
  });
  const [moduleForm, setModuleForm] = useState({
    courseId: "",
    title: "",
    videoUrl: "https://www.youtube.com/embed/Ke90Tje7VS0",
    order: 1,
    duration: "10 min",
    summary: "",
  });
  const [quizForm, setQuizForm] = useState({
    courseId: "",
    title: "New knowledge check",
    questions: JSON.stringify(
      [
        {
          question: "Sample question",
          options: ["Option A", "Option B", "Option C", "Option D"],
          answer: 0,
        },
      ],
      null,
      2
    ),
  });

  useEffect(() => {
    let active = true;

    async function hydrateAdmin() {
      try {
        const [courseData, userData] = await Promise.all([fetchCourses(), fetchUsers(token)]);

        if (!active) {
          return;
        }

        setCourses(courseData);
        setUsers(userData);
      } catch (_error) {
        if (active) {
          setStatus("Unable to load admin data");
        }
      }
    }

    hydrateAdmin();

    return () => {
      active = false;
    };
  }, [token]);

  const courseOptions = useMemo(
    () => courses.map((course) => ({ label: course.title, value: course._id })),
    [courses]
  );

  async function handleCreateCourse(event) {
    event.preventDefault();
    await createCourse(
      {
        ...courseForm,
        featured: false,
        accent: "from-cyan-400/80 via-blue-500/80 to-violet-600/90",
      },
      token
    );
    setStatus("Course created successfully");
    const [courseData, userData] = await Promise.all([fetchCourses(), fetchUsers(token)]);
    setCourses(courseData);
    setUsers(userData);
  }

  async function handleCreateModule(event) {
    event.preventDefault();
    await createModule(moduleForm.courseId, { ...moduleForm, order: Number(moduleForm.order) }, token);
    setStatus("Module added successfully");
    const [courseData, userData] = await Promise.all([fetchCourses(), fetchUsers(token)]);
    setCourses(courseData);
    setUsers(userData);
  }

  async function handleCreateQuiz(event) {
    event.preventDefault();
    await createQuiz(
      quizForm.courseId,
      {
        title: quizForm.title,
        questions: JSON.parse(quizForm.questions),
      },
      token
    );
    setStatus("Quiz created successfully");
  }

  function updateForm(setter) {
    return (event) => setter((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  return (
    <main className="section-shell space-y-8 pb-16 pt-10">
      <div className="glass-card p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Admin panel</p>
        <h1 className="mt-3 text-4xl font-semibold">Manage catalog, content, and users</h1>
        {status && <p className="mt-4 text-sm text-cyan-200">{status}</p>}
      </div>

      <section className="grid gap-6 xl:grid-cols-3">
        <form className="glass-card space-y-4 p-6" onSubmit={handleCreateCourse}>
          <h2 className="text-xl font-semibold">Add course</h2>
          {[
            ["title", "Title"],
            ["slug", "Slug"],
            ["description", "Description"],
            ["thumbnail", "Thumbnail URL"],
            ["category", "Category"],
            ["difficulty", "Difficulty"],
            ["duration", "Duration"],
            ["instructor", "Instructor"],
            ["price", "Price"],
          ].map(([name, label]) => (
            <div key={name}>
              <label className="mb-2 block text-sm text-slate-300">{label}</label>
              <input className="input-field" name={name} value={courseForm[name]} onChange={updateForm(setCourseForm)} required />
            </div>
          ))}
          <button className="primary-button w-full">Create course</button>
        </form>

        <form className="glass-card space-y-4 p-6" onSubmit={handleCreateModule}>
          <h2 className="text-xl font-semibold">Add module</h2>
          <select className="input-field" name="courseId" value={moduleForm.courseId} onChange={updateForm(setModuleForm)} required>
            <option value="" className="bg-slate-900">Select course</option>
            {courseOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-slate-900">
                {option.label}
              </option>
            ))}
          </select>
          {[
            ["title", "Module title"],
            ["videoUrl", "Video embed URL"],
            ["order", "Order"],
            ["duration", "Duration"],
            ["summary", "Summary"],
          ].map(([name, label]) => (
            <div key={name}>
              <label className="mb-2 block text-sm text-slate-300">{label}</label>
              <input className="input-field" name={name} value={moduleForm[name]} onChange={updateForm(setModuleForm)} required />
            </div>
          ))}
          <button className="primary-button w-full">Add module</button>
        </form>

        <form className="glass-card space-y-4 p-6" onSubmit={handleCreateQuiz}>
          <h2 className="text-xl font-semibold">Add quiz</h2>
          <select className="input-field" name="courseId" value={quizForm.courseId} onChange={updateForm(setQuizForm)} required>
            <option value="" className="bg-slate-900">Select course</option>
            {courseOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-slate-900">
                {option.label}
              </option>
            ))}
          </select>
          <div>
            <label className="mb-2 block text-sm text-slate-300">Quiz title</label>
            <input className="input-field" name="title" value={quizForm.title} onChange={updateForm(setQuizForm)} required />
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-300">Questions JSON</label>
            <textarea
              className="input-field min-h-64"
              name="questions"
              value={quizForm.questions}
              onChange={updateForm(setQuizForm)}
              required
            />
          </div>
          <button className="primary-button w-full">Create quiz</button>
        </form>
      </section>

      <section className="glass-card p-6">
        <h2 className="text-2xl font-semibold">Users</h2>
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-200">
            <thead className="text-slate-400">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t border-white/10">
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3 capitalize">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default AdminPanelPage;
