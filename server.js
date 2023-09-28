const express = require("express");
const mongoose = require("mongoose");
const debug = require("debug")("server");
const chalk = require("chalk");
const cors = require("cors");
const studentRoutes = require("./routes/studentRoutes");
const admission = require("./routes/admission");
const attendance = require("./routes/attendance");
const report = require("./routes/report");
const classes = require("./routes/class");
const teacher = require("./routes/teacher");
const schedule = require("./routes/schedule");
const subject = require("./routes/subject");
const announcement = require("./routes/announcement");
const lesson = require("./routes/lessonPlan");
const examSchedule = require("./routes/examSchedule.js");
const question = require("./routes/question");
const exam = require("./routes/Exam");
const path = require("path");
const admin = require("./routes/users");

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Register the  routes
app.use("/api/students", studentRoutes);
app.use("/api/admissions", admission);
app.use("/api/attendance", attendance);
app.use("/api/reports", report);
app.use("/api/classes", classes);
app.use("/api/teachers", teacher);
app.use("/api/schedules", schedule);
app.use("/api/subjects", subject);
app.use("/api/announcements", announcement);
app.use("/api/lesson-plans", lesson);
app.use("/api/exam-schedules", examSchedule);
app.use("/api/questions", question);
app.use("/api/exams", exam);
app.use("/api/register/admin", admin);

const URI = process.env.MONGO_URI;
mongoose
  .connect(URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(PORT);
      debug(`Server is running on port ${chalk.green(PORT)}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
