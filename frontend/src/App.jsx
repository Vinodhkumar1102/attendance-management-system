import React from 'react'
import{BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import EmployeeDashboard from './pages/EmployeeDashboard'
import PrivateRoutes from './utils/PrivateRoutes'
import RoleBaseRoute from './utils/RoleBaseRoute'
import AdminSummary from './component/dashboard/AdminSummary'
import DepartmentList from './component/department/DepartmentList'
import AddDepartment from './component/department/AddDepartment'
import EditDepartment from './component/department/EditDepartment'
import List from './component/employee/List'
import Add from './component/employee/Add'
import View from './component/employee/View'
import Edit from './component/employee/Edit'
import AddSalary from './component/salary/Add'
import ViewSalary from './component/salary/View'
import Summary from './component/EmployeeDashboard/Summary'
import LeaveList from './component/leave/List'
import AddLeave from './component/leave/Add'
import Setting from './component/EmployeeDashboard/Setting'
import Table from './component/leave/Table'
import Detail from './component/leave/Detail'
import Attendance from './component/attendance/Attendance'
import AttendanceReport from './component/attendance/AttendanceReport'
import EmployeeReports from './component/attendance/EmployeeReports'




const App = () => {
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element= {<Navigate to="/admin-dashboard" />}></Route>
    <Route path="/login" element={<Login />} ></Route>
    <Route path="/admin-dashboard" element={

      <PrivateRoutes>
        <RoleBaseRoute requiredRole={["admin"]}>
      <AdminDashboard />
      </RoleBaseRoute>
      </PrivateRoutes>

      } >
  <Route index element ={<AdminSummary />}></Route>
  <Route path ="/admin-dashboard/departments" element={<DepartmentList />}></Route>
  <Route path ="/admin-dashboard/add-department" element={<AddDepartment />}></Route>
  <Route path ="/admin-dashboard/department/:id" element={<EditDepartment />}></Route>
  <Route path ="/admin-dashboard/employees" element={<List />}></Route>
  <Route path ="/admin-dashboard/add-employee" element={<Add />}></Route>
  <Route path ="/admin-dashboard/employees/:id" element={<View />}></Route>
  <Route path ="/admin-dashboard/employees/edit/:id" element={<Edit />}></Route>
  <Route path ="/admin-dashboard/salary/add" element={<AddSalary />}></Route>
  <Route path ="/admin-dashboard/employees/salary/:id" element={<ViewSalary />}></Route>
  <Route path ="/admin-dashboard/leaves" element={<Table />}></Route>
  <Route path ="/admin-dashboard/leaves/:id" element={<Detail />}></Route>
  <Route path ="/admin-dashboard/employees/leaves/:id" element={<LeaveList />}></Route>
  <Route path ="/admin-dashboard/setting" element={<Setting />}></Route>
  <Route path ="/admin-dashboard/attendance" element={<Attendance />}></Route>
  <Route path ="/admin-dashboard/attendance-report" element={<AttendanceReport />}></Route>
  <Route path ="/admin-dashboard/employee-reports" element={<EmployeeReports />}></Route>
 


      </Route>
    <Route path="/employee-dashboard" element={
      <PrivateRoutes>
        <RoleBaseRoute requiredRole={["admin", "employee"]}>
             <EmployeeDashboard />
        </RoleBaseRoute>
      </PrivateRoutes>
   } >

  <Route index element ={<Summary />}></Route>
  <Route path="/employee-dashboard/profile/:id" element={<View />}></Route>
  <Route path="/employee-dashboard/leaves/:id" element={<LeaveList />}></Route>
  <Route path="/employee-dashboard/add-leave" element={<AddLeave />}></Route>
  <Route path="/employee-dashboard/salary/:id" element={<ViewSalary />}></Route>
  <Route path="/employee-dashboard/setting" element={<Setting/>}></Route>



   </Route>
  </Routes>
  </BrowserRouter>
  )
}

export default App
