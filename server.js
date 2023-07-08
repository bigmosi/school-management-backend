const express = require('express');
const mongoose = require('mongoose');
const debug = require('debug')('server');
const chalk = require('chalk');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');
const admission = require('./routes/admission');
const attendance = require('./routes/attendance');
const report = require('./routes/report');
const classes = require('./routes/class');
const teacher = require('./routes/teacher');
const schedule = require('./routes/schedule');
const subject = require('./routes/subject');
const announcement = require('./routes/announcement');
const lesson = require('./routes/lessonPlan');
const userRouter = require('./routes/userRoutes')

const PORT = process.env.PORT || 4000;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Register the  routes
app.use('/api/students', studentRoutes);
app.use('/api/admissions', admission);
app.use('/api/attendance', attendance);
app.use('/api/reports', report);
app.use('/api/classes', classes);
app.use('/api/teachers', teacher);
app.use('/api/schedules', schedule);
app.use('/api/subjects', subject);
app.use('/api/announcements', announcement);
app.use('/api/lesson-plans', lesson);
app.use('/api/users', userRouter)

mongoose
  .connect('mongodb://127.0.0.1:27017/schoolDB?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      debug(`Server is running on port ${chalk.green(PORT)}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });