import { useNavigate } from "react-router-dom"
import axios from "axios";


export const columns = [
    {
name: "S No",
selector: (row) => row.sno
    },
    {
name: "Department Name",
selector: (row) => row.dep_name,
sortable:true
    },
    {
name: "Action",
selector: (row) => row.action
    },
]


export const DepartmentButtons = ({Id,onDepartmentDelete}) =>{
    const navigate = useNavigate();

    const handleDelete = async (id) =>{
        const confirm = window.confirm("Do you Want to delete")
        if(confirm){
try {
  const response = await axios.delete(`import axios from 'axios';
import React from 'react'


export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
        sortable: true,
    width: "130px"
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width : "270px"
  },
  {
    name: "Emp Id",
    selector: (row) => row.employeeId,
    sortable: true,
    width : "150px"
  },

  {
    name: "Department",
    selector: (row) => row.department,
    width: "190px"
  },

  {
    name: "Action",
    selector: (row) => row.action,
    center: "true"
  },
];


 export const AttendanceHelper = ({ status, employeeId,statusChange}) => {
    const markEmployee = async (status, employeeId) =>{
  const response = await axios.put(`https://attendance-management-system-backend-qzzf.onrender.com/api/attendance/update/${employeeId}`, {status}, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    },

  })

  if(response.data.success){
    statusChange();
  }

    }
  return (
    <div>
     {status ==null ? (
     <div className='flex space-x-8'>
        <button className='px-4 py-2 bg-green-500 text-white'
        onClick={() => markEmployee("present",employeeId)}
        >Present
        </button>

        <button className='px-4 py-2 bg-red-500 text-white'
        onClick={() => markEmployee("Absent",employeeId)}
        >Absent
        </button>

        <button className='px-4 py-2 bg-amber-500 text-white'
        onClick={() => markEmployee("Sick",employeeId)}
        >Sick
        </button>


        <button className='px-4 py-2 bg-blue-500 text-white'
        onClick={() => markEmployee("Leave",employeeId)}
        >Leave
        </button>
        </div>
      )  : (<p className='bg-gray-100 w-20 text-center py-2 rounded'>{status}</p>
        )}
    </div>
  )
}
/api/department/${id}`,{
    headers:{
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
  })
  if(response.data.success){
onDepartmentDelete()
  }
} catch (error) {
  if(error.response && !error.response.data.success){
    alert(error.response.data.error)
  }
} 
        }
    };


    return (
        <div className="flex space-x-3">
        <button className="px-3 py-1 bg-teal-600 text-white"
        onClick={()=>{navigate(`/admin-dashboard/department/${Id}`)}}
        >Edit</button>
        <button className="px-3 py-1 bg-red-600 text-white"
        onClick={()=>handleDelete(Id)}>Delete</button>
        </div>
    )
}
