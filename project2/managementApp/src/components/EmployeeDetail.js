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
      // console.log()
      console.log("employee is: ", employee)
    }
  }, [employeeId, employees]);

  return (
    <div className="content">
      {employee && (
        <>
          <div className='content-info'>
            <p>{employee.firstName}  {employee.lastName}</p>
            <p> email is : {employee.email}</p>
            <p>address is : {employee.address}</p>
            <p>birthday is : {employee.birthday}</p>
            <p>emergency number is : {employee.emergency}</p>
            <p>gender is: {employee.gender}</p>
            <p>ssn number is: {employee.ssn}</p>
            <p>visaTitle is : {employee.visaTitle}</p>
  
          </div>
        </>
      )}
    </div>
  )
}

export default EmployeeDetail
