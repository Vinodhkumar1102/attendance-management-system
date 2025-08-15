import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AttendanceReport = () => {
  const [reportList, setReportList] = useState([]);
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [dateFilter, setDateFilter] = useState();
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({ limit, skip });
      if (dateFilter) {
        query.append("date", dateFilter);
      }
      const response = await axios.get(`https://attendance-management-system-backend-qzzf.onrender.com/api/attendance/report?${query.toString()}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
      });

      if (response.data.success) {
        const newData = flattenResponse(response.data.groupData);
        if (skip === 0) {
          setReportList(newData);
        } else {
          setReportList((prev) => [...prev, ...newData]);
        }
      }
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [skip, dateFilter]);

  const handleLoadMore = () => {
    setSkip((prevSkip) => prevSkip + limit);
  };

  const flattenResponse = (groupData) => {
    const entries = Object.entries(groupData);
    return entries.flatMap(([date, records]) =>
      records.map((record) => ({
        ...record,
        date
      }))
    );
  };

  return (
    <div className='min-h-screen p-10 bg-white'>
      <h2 className='text-center text-2xl font-bold mb-4'>Attendance Report</h2>

      <div className='mb-4'>
        <h3 className='text-lg font-semibold mb-1'>Filter by Date</h3>
        <input
          type="date"
          className='border px-2 py-1 bg-gray-100'
          onChange={(e) => {
            setDateFilter(e.target.value);
            setSkip(0);
          }}
        />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
         <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-sm">
  <thead className="bg-gray-200 text-left text-gray-700">
    <tr>
      <th className="border border-gray-300 px-4 py-2">S No</th>
      <th className="border border-gray-300 px-4 py-2">Employee ID</th>
      <th className="border border-gray-300 px-4 py-2">Name</th>
      <th className="border border-gray-300 px-4 py-2">Department</th>
      <th className="border border-gray-300 px-4 py-2">Status</th>
      <th className="border border-gray-300 px-4 py-2">Date</th>
    </tr>
  </thead>
  <tbody className="text-sm text-gray-800">
    {reportList.map((data, i) => (
      <tr
        key={`${data.employeeId}-${data.date}-${i}`}
        className="hover:bg-gray-50 transition-colors duration-200"
      >
        <td className="border border-gray-300 px-4 py-2">{i + 1}</td>
        <td className="border border-gray-300 px-4 py-2">{data.employeeId}</td>
        <td className="border border-gray-300 px-4 py-2">{data.employeeName}</td>
        <td className="border border-gray-300 px-4 py-2">{data.departmentName}</td>
        <td className="border border-gray-300 px-4 py-2">{data.status}</td>
        <td className="border border-gray-300 px-4 py-2">{data.date}</td>
      </tr>
    ))}
  </tbody>
</table>


          {reportList.length > 0 && (
            <div className='mt-4 text-center'>
              <button
                className='px-4 py-2 border bg-gray-100 font-semibold hover:bg-gray-200'
                onClick={handleLoadMore}
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AttendanceReport;
