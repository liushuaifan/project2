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
            <div>{employee.firstName}, {employee.lastName}</div>
            <div></div>
          </div>
        </>
      )}
    </div>
  )
}

export default EmployeeDetail
