import React, { useState, useRef } from "react";
import axios from "axios";

const AttendanceHistory = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [attendanceData, setAttendanceData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const printRef = useRef();

  const fetchAttendance = async () => {
    setError("");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/attendance/monthly-summary",
        {
          params: { employeeId, month, year },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAttendanceData(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching attendance");
      setAttendanceData(null);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    if (!attendanceData) return;

    // Use absolute paths from public folder for images
    const logoPath = "/images/logo1.png";       // Put logo.png in public/images/
    const signaturePath = "/images/signature.png"; // Put signature.png in public/images/

    const sortedRecords = [...attendanceData.attendanceRecords].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    const printWindow = window.open("", "", "height=900,width=900");
    printWindow.document.write("<html><head><title>Attendance Report</title>");
    printWindow.document.write(`
      <style>
        @page { margin: 20mm; }
        body {
          font-family: Arial, sans-serif;
          margin: 40px;
          color: #222;
        }
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #444;
          margin-bottom: 20px;
          padding-bottom: 10px;
        }
        header .company-info {
          max-width: 70%;
        }
        header h1 {
          font-size: 24px;
          margin: 0 0 5px 0;
        }
        header p {
          margin: 2px 0;
          font-size: 14px;
        }
        header img {
          width: 180px;
          height: 80;
          object-fit: contain;
          /* Align logo to right side */
          margin-left: auto;
        }
body::before {
  content: "V2 IT SOLUTION PVT LTD";
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-45deg);
  font-size: 70px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.1); /* subtle, light */
  user-select: none;
  pointer-events: none;
  white-space: nowrap;
  z-index: 9999;
  mix-blend-mode: multiply; /* blends nicely on light/dark backgrounds */
}



        h2 {
          text-align: center;
          margin-top: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 30px;
        }
        th, td {
          border: 1px solid #aaa;
          padding: 8px;
          text-align: center;
        }
        th {
          background-color: #f0f0f0;
        }
        .summary p {
          margin: 4px 0;
        }
        .signature-section {
          margin-top: 60px;
          text-align: right;
        }
        .signature-section img {
          width: 160px;
          height: auto;
          object-fit: contain;
          display: inline-block;
          margin-bottom: 5px;
        }
        .signature-name {
          border-top: 1px solid #000;
          display: inline-block;
          padding-top: 5px;
          font-weight: bold;
          font-size: 14px;
        }
      </style>
    `);
    printWindow.document.write("</head><body>");

    printWindow.document.write(`
      <header>
        <div class="company-info">
          <h1>V2 IT Solutions Pvt Ltd</h1>
          <p>Bt Pass Road, Khammam Telangana, India,</p>
          <p>Phone: +91 8333058080 | Email: info@v2its.com</p>
        </div>
        <img src="${logoPath}" alt="Company Logo" />
      </header>

      <h2>Monthly Attendance Report</h2>
      <div class="summary">
        <p><strong>Employee:</strong> ${attendanceData.employee.name} (${attendanceData.employee.employeeId})</p>
        <p><strong>Department:</strong> ${attendanceData.employee.department}</p>
        <p><strong>Month/Year:</strong> ${attendanceData.month}/${attendanceData.year}</p>
        <p><strong>Total Working Days:</strong> ${attendanceData.totalWorkingDays}</p>
        <p><strong>Present:</strong> ${attendanceData.presentDays}</p>
        <p><strong>Absent:</strong> ${attendanceData.absentDays}</p>
        <p><strong>Sundays:</strong> ${attendanceData.sundays}</p>
        <p><strong>Not Marked:</strong> ${attendanceData.notMarkedDays}</p>
      </div>

      <table>
        <thead>
          <tr>
            <th>S. No</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${sortedRecords
            .map(
              (rec, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${rec.date}</td>
              <td>${rec.status.charAt(0).toUpperCase() + rec.status.slice(1)}</td>
            </tr>`
            )
            .join("")}
        </tbody>
      </table>

      <div class="signature-section">
        <img src="${signaturePath}" alt="Manager Signature" />
        <div class="signature-name">Manager Signature</div>
      </div>
    `);

    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Monthly Attendance Summary</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Employee ID (e.g. V201)"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Month (1-12)"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Year (e.g. 2025)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <button
        onClick={fetchAttendance}
        disabled={loading}
        className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 mb-6"
      >
        {loading ? "Loading..." : "Get Attendance"}
      </button>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {attendanceData && (
        <>
          <div ref={printRef} className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">
              {attendanceData.employee.name} ({attendanceData.employee.employeeId})
            </h3>
            <p>Department: {attendanceData.employee.department}</p>
            <p>
              Month: {attendanceData.month}/{attendanceData.year}
            </p>
            <p>Total Working Days: {attendanceData.totalWorkingDays}</p>
            <p>Present: {attendanceData.presentDays}</p>
            <p>Absent: {attendanceData.absentDays}</p>
            <p>Sundays: {attendanceData.sundays}</p>
            <p>Not Marked: {attendanceData.notMarkedDays}</p>

            <h4 className="mt-6 text-lg font-semibold">Attendance Records</h4>

            <div className="overflow-x-auto mt-3">
              <table className="min-w-full border border-gray-400 rounded shadow">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border px-4 py-2 text-left">S. No</th>
                    <th className="border px-4 py-2 text-left">Date</th>
                    <th className="border px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[...attendanceData.attendanceRecords]
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .map((rec, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border px-4 py-2">{index + 1}</td>
                        <td className="border px-4 py-2">{rec.date}</td>
                        <td
                          className={`border px-4 py-2 font-semibold ${
                            rec.status === "present"
                              ? "text-green-600"
                              : rec.status === "absent"
                              ? "text-red-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {rec.status.charAt(0).toUpperCase() + rec.status.slice(1)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          <button
            onClick={handlePrint}
            className="mt-6 bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700"
          >
            Print Attendance Report
          </button>
        </>
      )}
    </div>
  );
};

export default AttendanceHistory;
