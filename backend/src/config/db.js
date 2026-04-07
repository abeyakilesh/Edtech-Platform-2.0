import mongoose from "mongoose";
import { env } from "./env.js";

export const dbState = {
  connected: false,
  mode: "memory",
};

export async function connectDB() {
  if (!env.mongodbUri) {
    console.warn("MongoDB URI not provided. Starting EduCore API in memory mode.");
    return;
  }

  try {
    await mongoose.connect(env.mongodbUri);
    dbState.connected = true;
    dbState.mode = "mongodb";
    console.log("MongoDB connected");
  } catch (error) {
    console.warn(`MongoDB connection failed. Falling back to memory mode. ${error.message}`);
  }
}
