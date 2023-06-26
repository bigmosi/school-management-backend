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
const authRouter = require('./routes/auth');

const PORT = process.env.PORT || 4000;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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
app.use('/api/auth', authRouter);

mongoose
  .connect('mongodb://localhost:27017/schoolDB')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      debug(`Server is running on port ${chalk.green(PORT)}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });