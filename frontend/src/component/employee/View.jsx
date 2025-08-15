import axios from 'axios'
import React, { useState ,useEffect} from 'react'
import { useParams } from 'react-router-dom'


const View = () => {
    const { id } = useParams()
const [employee, setEmployee] = useState(null)

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`https://attendance-management-system-backend-qzzf.onrender.com/api/employee/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                console.log(response.data)
                if (response.data.success) {
                    setEmployee(response.data.employee)
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            }
        }
        fetchEmployee();
    }, [])
    return (
     <>
  {employee ? (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-pacific mb-8 text-center text-gray-800 underline">
        Employee Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left Side - Profile Image */}
        <div className="flex justify-center md:justify-start">
          <img
            src={`http://localhost:5000/${employee.userId.profileImage}`}
            alt="Profile"
            className="w-72 h-72 object-cover rounded-full border-4 border-gray-300 shadow-md"
          />
        </div>

        {/* Right Side - Employee Info */}
        <div className="space-y-5">
          <div className="flex">
            <p className="w-40 font-bold text-gray-700">Name:</p>
            <p className="text-gray-800">{employee.userId.name}</p>
          </div>
          <div className="flex">
            <p className="w-40 font-bold text-gray-700">Employee ID:</p>
            <p className="text-gray-800">{employee.employeeId}</p>
          </div>
          <div className="flex">
            <p className="w-40 font-bold text-gray-700">Date of Birth:</p>
            <p className="text-gray-800">
              {new Date(employee.dob).toLocaleDateString()}
            </p>
          </div>
          <div className="flex">
            <p className="w-40 font-bold text-gray-700">Gender:</p>
            <p className="text-gray-800">{employee.gender}</p>
          </div>
          <div className="flex">
            <p className="w-40 font-bold text-gray-700">Department:</p>
            <p className="text-gray-800">{employee.department.dep_name}</p>
          </div>
          <div className="flex">
            <p className="w-40 font-bold text-gray-700">Marital Status:</p>
            <p className="text-gray-800">{employee.maritalStatus}</p>
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

export default View
