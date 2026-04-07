import bcrypt from "bcryptjs";

const demoPasswordHash = bcrypt.hashSync("Password123!", 10);

const courseBlueprints = [
  {
    slug: "web-development-basics",
    title: "Web Development Basics",
    category: "Frontend",
    difficulty: "Beginner",
    duration: "6 weeks",
    description:
      "Start from HTML, CSS, and browser fundamentals, then build polished responsive landing pages.",
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    accent: "from-cyan-400/80 via-sky-500/80 to-indigo-600/90",
  },
  {
    slug: "javascript-mastery",
    title: "JavaScript Mastery",
    category: "Frontend",
    difficulty: "Intermediate",
    duration: "8 weeks",
    description:
      "Build confidence with modern JavaScript, async patterns, APIs, and problem-solving workflows.",
    thumbnail:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
    accent: "from-amber-300/80 via-orange-400/80 to-rose-500/90",
  },
  {
    slug: "react-for-beginners",
    title: "React for Beginners",
    category: "Frontend",
    difficulty: "Beginner",
    duration: "7 weeks",
    description:
      "Learn component thinking, routing, state, and reusable patterns while building a modern app.",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80",
    accent: "from-sky-300/80 via-cyan-400/80 to-blue-600/90",
  },
  {
    slug: "nodejs-essentials",
    title: "Node.js Essentials",
    category: "Backend",
    difficulty: "Intermediate",
    duration: "6 weeks",
    description:
      "Create secure APIs, understand middleware, and structure backend services for real products.",
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    accent: "from-emerald-300/80 via-green-400/80 to-teal-600/90",
  },
  {
    slug: "mongodb-crash-course",
    title: "MongoDB Crash Course",
    category: "Database",
    difficulty: "Intermediate",
    duration: "4 weeks",
    description:
      "Model collections, query data, design schemas, and integrate MongoDB into app workflows.",
    thumbnail:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80",
    accent: "from-lime-300/80 via-green-500/80 to-emerald-700/90",
  },
  {
    slug: "data-structures-in-c",
    title: "Data Structures in C",
    category: "Programming",
    difficulty: "Intermediate",
    duration: "8 weeks",
    description:
      "Master arrays, stacks, queues, trees, and algorithmic reasoning through C implementations.",
    thumbnail:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    accent: "from-fuchsia-300/80 via-purple-500/80 to-indigo-700/90",
  },
  {
    slug: "python-fundamentals",
    title: "Python Fundamentals",
    category: "Programming",
    difficulty: "Beginner",
    duration: "5 weeks",
    description:
      "Learn Python syntax, functions, data structures, and clean coding habits with mini projects.",
    thumbnail:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80",
    accent: "from-yellow-300/80 via-amber-400/80 to-orange-500/90",
  },
  {
    slug: "sql-for-beginners",
    title: "SQL for Beginners",
    category: "Database",
    difficulty: "Beginner",
    duration: "4 weeks",
    description:
      "Query confidently, model data, and write joins, aggregations, and filters for analytics workflows.",
    thumbnail:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    accent: "from-slate-300/80 via-sky-400/80 to-blue-700/90",
  },
  {
    slug: "cloud-basics-aws",
    title: "Cloud Basics (AWS)",
    category: "Cloud",
    difficulty: "Intermediate",
    duration: "6 weeks",
    description:
      "Understand cloud services, compute, storage, IAM, and deployment patterns used in modern teams.",
    thumbnail:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    accent: "from-cyan-300/80 via-blue-500/80 to-violet-700/90",
  },
  {
    slug: "ai-fundamentals",
    title: "AI Fundamentals",
    category: "AI",
    difficulty: "Beginner",
    duration: "7 weeks",
    description:
      "Explore machine learning ideas, model evaluation, prompts, and practical AI product workflows.",
    thumbnail:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    accent: "from-violet-300/80 via-fuchsia-500/80 to-pink-600/90",
  },
];

const moduleTemplates = [
  "Welcome and roadmap",
  "Core concepts in action",
  "Hands-on guided build",
  "Real-world workflows",
  "Capstone wrap-up",
];

const quizTemplates = [
  {
    question: "What is the main focus of this lesson?",
    options: [
      "Understanding fundamentals before scaling complexity",
      "Skipping theory and jumping straight to deployment",
      "Using one tool for every problem",
      "Avoiding hands-on practice",
    ],
    answer: 0,
  },
  {
    question: "Which learning habit improves long-term retention most?",
    options: [
      "Passive watching only",
      "Practice plus feedback loops",
      "Ignoring mistakes",
      "Memorizing without projects",
    ],
    answer: 1,
  },
  {
    question: "Why are projects included in this course?",
    options: [
      "Only to fill time",
      "To avoid assessment",
      "To connect theory with product-ready outcomes",
      "To replace all lessons",
    ],
    answer: 2,
  },
  {
    question: "What should a student do after completing a module?",
    options: [
      "Review the lesson and apply it in practice",
      "Skip immediately to the final exam",
      "Restart the whole course",
      "Delete their notes",
    ],
    answer: 0,
  },
  {
    question: "How is progress improved across the platform?",
    options: [
      "By repeating the same easy task only",
      "By combining lessons, quizzes, and project work",
      "By reading titles without opening content",
      "By waiting until the end to study",
    ],
    answer: 1,
  },
];

export const demoCourses = courseBlueprints.map((course, index) => ({
  _id: `course-${index + 1}`,
  ...course,
  instructor: [
    "Aarav Menon",
    "Nisha Kapoor",
    "Rohan Iyer",
    "Sara Thomas",
    "Mira Sen",
  ][index % 5],
  rating: Number((4.6 + (index % 4) * 0.1).toFixed(1)),
  studentsCount: 1200 + index * 430,
  lessonsCount: 5,
  price: 999 + index * 250,
  featured: index < 4,
}));

export const demoModules = demoCourses.flatMap((course) =>
  moduleTemplates.map((title, index) => ({
    _id: `module-${course._id}-${index + 1}`,
    courseId: course._id,
    title: `${course.title}: ${title}`,
    duration: `${8 + index * 3} min`,
    order: index + 1,
    videoUrl: `https://www.youtube.com/embed/${["Ke90Tje7VS0", "PkZNo7MFNFg", "TlB_eWDSMt4", "fBNz5xF-Kx4", "Oe421EPjeBE"][index]}`,
    summary: `This lesson walks through ${title.toLowerCase()} for ${course.title}.`,
  }))
);

export const demoQuizzes = demoCourses.map((course) => ({
  _id: `quiz-${course._id}`,
  courseId: course._id,
  title: `${course.title} Knowledge Check`,
  questions: quizTemplates.map((item, index) => ({
    id: `${course._id}-question-${index + 1}`,
    question: item.question,
    options: item.options,
    answer: item.answer,
  })),
}));

export const demoProgress = [
  {
    _id: "progress-1",
    userId: "student-1",
    courseId: "course-1",
    completion: 60,
    completedModules: ["module-course-1-1", "module-course-1-2", "module-course-1-3"],
    lastModuleId: "module-course-1-3",
    quizScores: [{ quizId: "quiz-course-1", score: 80 }],
  },
  {
    _id: "progress-2",
    userId: "student-1",
    courseId: "course-3",
    completion: 25,
    completedModules: ["module-course-3-1"],
    lastModuleId: "module-course-3-1",
    quizScores: [],
  },
];

export const demoUsers = [
  {
    _id: "admin-1",
    name: "EduCore Admin",
    email: "admin@educore.com",
    password: demoPasswordHash,
    role: "admin",
  },
  {
    _id: "student-1",
    name: "Demo Student",
    email: "student@educore.com",
    password: demoPasswordHash,
    role: "student",
  },
];

