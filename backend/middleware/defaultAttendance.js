import Attendance from "../models/Attendance.js";
import Employee from '../models/Employee.js'

const defaultAttendance = async (req, res, next) => {
  try {
    const date = new Date().toISOString().split('T')[0];

    const employees = await Employee.find({});
    const existingAttendance = await Attendance.find({ date });

    const existingEmployeeIds = new Set(
      existingAttendance.map((record) => record.employeeId.toString())
    );

    const missingAttendance = employees
      .filter((emp) => !existingEmployeeIds.has(emp._id.toString()))
      .map((employee) => ({
        date,
        employeeId: employee._id,
        status: null,
      }));

    if (missingAttendance.length > 0) {
      await Attendance.insertMany(missingAttendance);
    }

    next();
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export default defaultAttendance;