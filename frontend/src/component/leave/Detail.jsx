import axios from 'axios'
import React, { useState ,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const Detail = () => {
    const { id } = useParams()
const [leave, setLeave] = useState(null)
const navigate = useNavigate();

    useEffect(() => {
        const fetchLeave = async () => {
            try {
                const response = await axios.get(`https://attendance-management-system-backend-qzzf.onrender.com/api/leave/detail/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                console.log(response.data)
                if (response.data.success) {
                    setLeave(response.data.leave)
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            }
        }
        fetchLeave();
    }, []);
  
      const changeStatus = async (id,status) => {
            try {
                const response = await axios.put(`https://attendance-management-system-backend-qzzf.onrender.com/api/leave/${id}`,
                   { status }, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    },
                })
                // console.log(response.data)
                if (response.data.success) {
                    navigate('/admin-dashboard/leaves')
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            }
      }
    
    return (
     <>
  {leave ? (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-greatvibes underline mb-8 text-center text-gray-800">
        Leave Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left Side - Profile Image */}
        <div className="flex justify-center md:justify-start">
          <img
            src={`https://attendance-management-system-backend-qzzf.onrender.com/${leave.employeeId.userId.profileImage}`}
            alt="Profile"
            className="w-72 h-72 object-cover rounded-full border-4 border-gray-300 shadow-md"
          />
        </div>

        {/* Right Side - Employee Info */}
        <div className="space-y-5">
          <div className="flex">
            <p className="w-40 font-bold text-gray-700">Name:</p>
            <p className="text-gray-800">{leave.employeeId.userId.name}</p>
          </div>
          <div className="flex">
            <p className="w-40 font-bold text-gray-700">Employee ID:</p>
            <p className="text-gray-800">{leave.employeeId.employeeId}</p>
          </div>
          <div className="flex">
            <p className="w-40 font-bold text-gray-700">LeaveType:</p>
          <p className="text-gray-800">{leave.leaveType}</p>

          </div>
          <div className="flex">
            <p className="w-40 font-bold text-gray-700">Reason:</p>
            <p className="text-gray-800">{leave.reason}</p>
          </div>
          <div className="flex">
            <p className="w-40 font-bold text-gray-700">Department:</p>
            <p className="text-gray-800">{leave.employeeId.department.dep_name}</p>
          </div>
          <div className="flex">
            <p className="w-40 font-bold text-gray-700">Start Date:</p>
            <p className="text-gray-800">{new Date(leave.startDate).toLocaleDateString()}</p>
          </div>
          <div className="flex">
            <p className="w-40 font-bold text-gray-700">End Date:</p>
            <p className="text-gray-800">{new Date(leave.endDate).toLocaleDateString()}</p>
          </div>
          <div className="flex">
            <p className="w-40 font-bold text-gray-700">
                {leave.status === "Pending" ? "Action:" : "Status:"}
                </p>
                {leave.status === "Pending" ? (
                    <div className='flex space-x-2'>
                        <button className='px-2 py-0.5 bg-teal-300 hover:bg-teal-400'
                        onClick={() => changeStatus(leave._id, "Approved")}>Approve</button>
                        <button className='px-2 py-0.5 bg-red-300 hover:bg-red-400'
                        onClick={() => changeStatus(leave._id, "Rejected")}>Reject</button>
                    </div>
                ) :
            
            <p className="text-gray-800">{leave.status}</p>
}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  )}
</>

        
    )
}

export default Detail
