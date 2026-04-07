import { dbState } from "../config/db.js";
import { env } from "../config/env.js";
import { stripe, stripeEnabled } from "../config/stripe.js";
import { createMemoryId, memoryStore } from "../data/memoryStore.js";
import { Course } from "../models/Course.js";
import { Payment } from "../models/Payment.js";
import { Progress } from "../models/Progress.js";

async function findCourse(courseId) {
  return dbState.connected
    ? Course.findById(courseId)
    : memoryStore.courses.find((course) => course._id === courseId);
}

async function ensureEnrollment(userId, courseId) {
  if (dbState.connected) {
    const existing = await Progress.findOne({ userId, courseId });
    if (existing) return existing;

    return Progress.create({
      userId,
      courseId,
      completion: 0,
      completedModules: [],
      lastModuleId: "",
      quizScores: [],
    });
  }

  let progress = memoryStore.progress.find((item) => item.userId === userId && item.courseId === courseId);
  if (!progress) {
    progress = {
      _id: createMemoryId("progress"),
      userId,
      courseId,
      completion: 0,
      completedModules: [],
      lastModuleId: "",
      quizScores: [],
      createdAt: new Date().toISOString(),
    };
    memoryStore.progress.push(progress);
  }
  return progress;
}

export async function createCheckoutSession(req, res) {
  const { courseId } = req.body;
  const course = await findCourse(courseId);

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  if (stripeEnabled) {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: req.user.email,
      line_items: [
        {
          price_data: {
            currency: "inr",
            unit_amount: course.price * 100,
            product_data: {
              name: course.title,
              description: course.description,
              images: course.thumbnail ? [course.thumbnail] : [],
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${env.clientUrl}/checkout/success?courseId=${courseId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.clientUrl}/courses/${courseId}`,
      metadata: {
        courseId: String(courseId),
        userId: String(req.user._id),
      },
    });

    if (dbState.connected) {
      await Payment.create({
        userId: req.user._id,
        courseId,
        amount: course.price,
        status: "pending",
        provider: "stripe",
        sessionId: session.id,
      });
    } else {
      memoryStore.payments.push({
        _id: createMemoryId("payment"),
        userId: req.user._id,
        courseId,
        amount: course.price,
        currency: "inr",
        provider: "stripe",
        status: "pending",
        sessionId: session.id,
        createdAt: new Date().toISOString(),
      });
    }

    return res.json({
      mode: "stripe",
      checkoutUrl: session.url,
      sessionId: session.id,
    });
  }

  const demoSessionId = createMemoryId("demo-session");
  memoryStore.payments.push({
    _id: createMemoryId("payment"),
    userId: req.user._id,
    courseId,
    amount: course.price,
    currency: "inr",
    provider: "demo",
    status: "pending",
    sessionId: demoSessionId,
    createdAt: new Date().toISOString(),
  });

  return res.json({
    mode: "demo",
    sessionId: demoSessionId,
    checkoutUrl: `${env.clientUrl}/checkout/success?courseId=${courseId}&session_id=${demoSessionId}&demo=1`,
  });
}

export async function confirmCheckoutSession(req, res) {
  const { courseId, sessionId } = req.body;
  const course = await findCourse(courseId);

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  if (dbState.connected) {
    let payment = await Payment.findOne({ sessionId, userId: req.user._id, courseId });

    if (stripeEnabled && sessionId) {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.payment_status !== "paid") {
        return res.status(400).json({ message: "Payment not completed yet" });
      }

      payment = await Payment.findOneAndUpdate(
        { sessionId, userId: req.user._id, courseId },
        {
          userId: req.user._id,
          courseId,
          amount: course.price,
          currency: "inr",
          provider: "stripe",
          status: "paid",
          sessionId,
          receiptUrl: session.invoice_pdf || "",
        },
        { upsert: true, new: true }
      );
    } else {
      payment = await Payment.findOneAndUpdate(
        { sessionId, userId: req.user._id, courseId },
        {
          userId: req.user._id,
          courseId,
          amount: course.price,
          currency: "inr",
          provider: "demo",
          status: "paid",
          sessionId,
        },
        { upsert: true, new: true }
      );
    }

    await ensureEnrollment(req.user._id, courseId);
    return res.json({ success: true, payment });
  }

  const payment = memoryStore.payments.find(
    (item) => item.sessionId === sessionId && item.userId === req.user._id && item.courseId === courseId
  );

  if (!payment) {
    return res.status(404).json({ message: "Payment session not found" });
  }

  payment.status = "paid";
  payment.updatedAt = new Date().toISOString();
  await ensureEnrollment(req.user._id, courseId);

  return res.json({ success: true, payment });
}
