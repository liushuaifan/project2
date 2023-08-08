import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeesAction, updateEmployeeAction } from '../app/employeeSlice';

function EmployeeDetail() {

  const { employeeId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployeesAction());
  }, []);

  
  const [employee, setEmployee] = useState(null);
  const { employees } = useSelector(state => state.employees);

  useEffect(() => {
    console.log(employees)
    if(employeeId && employees){
      setEmployee(employees.find(employee => employee._id === employeeId));
      console.log("employee is: ", employee)
    }
  }, [employeeId, employees]);

  return (
    <div className="content">
      {employee && (
        <>
          <div className='content-info'>
            <p><b>{employee.firstName}  {employee.lastName}</b></p>
            <p><b>Email:</b> {employee.email}</p>
            <p><b>Address:</b> {employee.address}</p>
            <p><b>Birthday:</b> {employee.birthday}</p>
            <p><b>Gender:</b> {employee.gender}</p>
            <p><b>SSN Number:</b> {employee.ssn}</p>
            <p><b>VisaTitle:</b> {employee.visaTitle}</p>
            <p><b>Emergency Member:</b> {employee.emergencyFirstName}  {employee.emergencyLastName}</p>
  
          </div>
        </>
      )}
    </div>
  )
}

export default EmployeeDetail
