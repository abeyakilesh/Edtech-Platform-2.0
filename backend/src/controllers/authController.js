import bcrypt from "bcryptjs";
import { dbState } from "../config/db.js";
import { createMemoryId, memoryStore } from "../data/memoryStore.js";
import { User } from "../models/User.js";
import { signToken } from "../utils/jwt.js";
import { sanitizeUser } from "../utils/sanitizeUser.js";

export async function register(req, res) {
  const { name, email, password, role = "student" } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }

  const normalizedEmail = email.toLowerCase();
  const hashedPassword = await bcrypt.hash(password, 10);

  let user;

  if (dbState.connected) {
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role,
    });
  } else {
    const existingUser = memoryStore.users.find((item) => item.email === normalizedEmail);
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    user = {
      _id: createMemoryId("user"),
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role,
    };
    memoryStore.users.push(user);
  }

  const safeUser = sanitizeUser(user);
  const token = signToken({ id: safeUser._id, role: safeUser.role });

  res.status(201).json({ token, user: safeUser });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const normalizedEmail = email?.toLowerCase();

  if (!normalizedEmail || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = dbState.connected
    ? await User.findOne({ email: normalizedEmail })
    : memoryStore.users.find((item) => item.email === normalizedEmail);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const safeUser = sanitizeUser(user);
  const token = signToken({ id: safeUser._id, role: safeUser.role });

  res.json({ token, user: safeUser });
}

export async function getCurrentUser(req, res) {
  res.json({ user: req.user });
}
