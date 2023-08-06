import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeesAction, updateEmployeeAction } from '../app/employeeSlice';


function EmployeeList() {

  const navigate = new useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployeesAction());
  }, []);

  const [input, setInput] = useState("");
  const { employees } = useSelector(state => state.employees);
  console.log(employees)

  const handleClick = (employee) => {
    navigate(`/hr/employeeList/${employee._id}`);
  }

  const handleInput=(e)=>{
    setInput(e.target.value);
  }

  return (
    <div className="App">
      <div>
        <input type="text" id="fname" name="fname" onChange={(e)=>handleInput(e)}/> search for an employee by first name or last name
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>SSN</th>
              <th>Work Authorization</th>
              <th>Phone number</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {employees && employees.filter(employee=> input==="" || employee.firstName.includes(input) || employee.lastName.includes(input)).map((employee => (
              <tr key={employee.id}>
                <th onClick={()=> handleClick(employee)}>{employee.firstName}  {employee.lastName}</th>
                <th>{employee.email}</th>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EmployeeList
