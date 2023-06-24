const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

router.post('/', async (req, res) => {
  const reportParams = req.body; // Retrieve the report parameters from the request body

  // Generate the report params
  const { startDate, endDate, studentId } = reportParams;

  try {
    // Retrieve student attendance data from the database based on the provided studentId, startDate, and endDate
    const attendanceData = await getAttendanceData(studentId, startDate, endDate);

    // Perform any necessary calculations or data manipulation to generate the report content
    const reportContent = generateAttendanceReport(attendanceData);

    // Return the generated report as a response
    res.status(200).json({ report: reportContent });
  } catch (error) {
    console.error('Error generating the attendance report:', error);
    res.status(500).json({ error: 'An error occurred while generating the report' });
  }
});

// Function to retrieve student attendance data from the database
async function getAttendanceData(studentId, startDate, endDate) {
  try {
    const attendanceData = await Attendance.find({
      student: studentId,
      date: { $gte: startDate, $lte: endDate },
    });

    return attendanceData;
  } catch (error) {
    console.error('Error retrieving the attendance data:', error);
    throw error;
  }
}

// Function to generate the attendance report based on the attendanceData
function generateAttendanceReport(attendanceData) {
  let presentCount = 0;
  let absentCount = 0;

  attendanceData.forEach((attendance) => {
    if (attendance.status === 'Present') {
      presentCount++;
    } else if (attendance.status === 'Absent') {
      absentCount++;
    }
  });

  const reportContent = `Attendance Report\n` +
    `Total Present: ${presentCount}\n` +
    `Total Absent: ${absentCount}\n`;

  return reportContent;
}

module.exports = router;
