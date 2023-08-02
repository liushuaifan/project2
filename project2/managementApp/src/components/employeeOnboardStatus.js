import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeesAction } from '../app/employeeSlice';

function EmployeeOnboardStatus() {

  const dispatch = useDispatch();
  const { employeeId } = useParams();

  useEffect(() => {
    dispatch(fetchEmployeesAction());
  }, []);


  const { employees } = useSelector(state => state.employees);
  console.log("Selected employee is:", employees)
  const employee = employees && employees.find(employee => employee._id===employeeId);

  return (
    employee && (
      <>
        <div>First Name: {employee.firstName}</div>
        <div>Last Name: {employee.lastName}</div>
        <div>Email: {employee.email}</div>
      </>

        )
    )
    
}

export default EmployeeOnboardStatus