
import Attendance from '../models/Attendance.js'
import Employee from '../models/Employee.js'
import moment from 'moment'
import mongoose from 'mongoose'


const getAttendance = async (req,res)=>{
    try {
        const date = new Date().toISOString().split('T')[0]
        const attendance = await Attendance.find({ date }).populate({
            path: "employeeId",
            populate: [
                "department",
                "userId"
            ]
        })
        res.status(200).json({success: true, attendance})
    } catch (error) {
        res.status(500).json({success:false, message: error.message})
    }
}


const updateAttendance = async (req,res)=>{
try {
    const {employeeId} = req.params
    const {status} = req.body
    const date = new Date().toISOString().split('T')[0]
    const employee = await Employee.findOne({employeeId})

    const attendance = await Attendance.findOneAndUpdate({employeeId: employee._id, date}, {status}, {new: true})
    res.status(200).json({success: true, attendance})
} catch (error) {
    res.status(500).json({success:false, message: error.message})
}
}

const attendanceReport = async (req, res) => {
  try {
    const { date, limit = 5, skip = 0 } = req.query;
    const query = {};

    if (date) {
      query.date = date;
    }

    const attendanceData = await Attendance.find(query)
      .populate({
        path: "employeeId",
        populate: ["department", "userId"]
      })
      .sort({ date: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    const groupData = attendanceData.reduce((result, record) => {
      if (!result[record.date]) {
        result[record.date] = [];
      }

      result[record.date].push({
        employeeId: record.employeeId.employeeId,
        employeeName: record.employeeId.userId.name,
        departmentName: record.employeeId.department.dep_name,
        status: record.status || "Not Marked"
      });

      return result;
    }, {}); // ✅ Initial value added here

    return res.status(201).json({
      success: true,
      groupData
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getEmployeeAttendanceHistory = async (req, res) => {
    try {
        const { employeeId, month, year } = req.query;
        
        if (!employeeId || !month || !year) {
            return res.status(400).json({ 
                success: false, 
                message: "Employee ID, month and year are required" 
            });
        }

        const monthNum = parseInt(month, 10);
        const yearNum = parseInt(year, 10);
        
        if (isNaN(monthNum) || isNaN(yearNum) || monthNum < 1 || monthNum > 12) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid month or year. Month must be between 1-12" 
            });
        }

        const employee = await Employee.findOne({ employeeId })
            .populate('department')
            .populate('userId', 'name');
        
        if (!employee) {
            return res.status(404).json({ 
                success: false, 
                message: "Employee not found" 
            });
        }

        const startDate = new Date(Date.UTC(yearNum, monthNum - 1, 1));
        const endDate = new Date(Date.UTC(yearNum, monthNum, 0));
        
        const startDateStr = startDate.toISOString().split('T')[0];
        const endDateStr = endDate.toISOString().split('T')[0];

        // Fetch attendance records
        const attendanceRecords = await Attendance.find({
            employeeId: employee._id,
            date: { $gte: startDateStr, $lte: endDateStr }
        }).sort({ date: 1 });

        // Map date => status for quick lookup
        const attendanceMap = {};
        attendanceRecords.forEach(record => {
            attendanceMap[record.date] = record.status.toLowerCase();
        });

        const allDatesInMonth = [];
        const attendanceResult = [];

        let presentDays = 0;
        let absentDays = 0;
        let notMarkedDays = 0;
        let sundays = 0;

        const todayUTC = new Date();
        // Set todayUTC to midnight UTC for comparison (strip time)
        todayUTC.setUTCHours(0, 0, 0, 0);

        const currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            const dateStr = currentDate.toISOString().split('T')[0];
            allDatesInMonth.push(dateStr);

            if (currentDate.getUTCDay() === 0) { // Sunday
                attendanceResult.push({
                    date: dateStr,
                    status: "holiday"
                });
                sundays++;
            } else {
                // Check if attendance exists
                if (attendanceMap[dateStr]) {
                    const status = attendanceMap[dateStr];
                    attendanceResult.push({ date: dateStr, status });
                    if (status === "present") presentDays++;
                    else if (status === "absent") absentDays++;
                } else {
                    // No attendance record found
                    if (currentDate < todayUTC) {
                        // Past day, mark absent
                        attendanceResult.push({ date: dateStr, status: "absent" });
                        absentDays++;
                    } else {
                        // Future day, mark not marked
                        attendanceResult.push({ date: dateStr, status: "not marked" });
                        notMarkedDays++;
                    }
                }
            }

            currentDate.setUTCDate(currentDate.getUTCDate() + 1);
        }

        const totalWorkingDays = allDatesInMonth.length - sundays;

        return res.status(200).json({
            success: true,
            data: {
                employee: {
                    name: employee.userId.name,
                    department: employee.department.dep_name,
                    employeeId: employee.employeeId
                },
                month: monthNum,
                year: yearNum,
                totalWorkingDays,
                presentDays,
                absentDays,
                sundays,
                notMarkedDays,
                attendanceRecords: attendanceResult,
                startDate: startDateStr,
                endDate: endDateStr
            }
        });

    } catch (error) {
        console.error("Error in getEmployeeAttendanceHistory:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Server error in fetching attendance history",
            error: error.message 
        });
    }
};







export { getAttendance, updateAttendance, attendanceReport,getEmployeeAttendanceHistory};
