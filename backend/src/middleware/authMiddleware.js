import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { dbState } from "../config/db.js";
import { memoryStore } from "../data/memoryStore.js";
import { User } from "../models/User.js";

export async function protect(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, env.jwtSecret);

    if (dbState.connected) {
      req.user = await User.findById(decoded.id).select("-password");
    } else {
      req.user = memoryStore.users.find((user) => user._id === decoded.id);
      if (req.user) {
        const { password, ...safeUser } = req.user;
        req.user = safeUser;
      }
    }

    if (!req.user) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

export async function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return next();
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, env.jwtSecret);

    if (dbState.connected) {
      req.user = await User.findById(decoded.id).select("-password");
    } else {
      req.user = memoryStore.users.find((user) => user._id === decoded.id);
      if (req.user) {
        const { password, ...safeUser } = req.user;
        req.user = safeUser;
      }
    }
  } catch (_error) {
    req.user = null;
  }

  next();
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
}
