import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

function EmployeeList() {

  const navigate = new useNavigate();

  const [employees, setEmployees] = useState([{id:'0', name: 'Jason', ssn: '000-000-000', phone: '000-000-000'},
  {id:'1', name: 'Ruler', ssn: '000-000-000', phone: '000-000-000'},
  {id:'2', name: 'Alex', ssn: '000-000-000', phone: '000-000-000'},
  {id:'3', name: 'Robert', ssn: '000-000-000', phone: '000-000-000'},
  {id:'4', name: 'Aaron', ssn: '000-000-000', phone: '000-000-000'},
  {id:'5', name: 'Jack', ssn: '000-000-000', phone: '000-000-000'}]);

  const handleClick = (employee) => {
    navigate(`/hr/employeeList/${employee.id}`);
  }

  return (
    <div className="App">
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>SSN</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee => (
              <tr key={employee.id}>
                <th onClick={()=> handleClick(employee)}>{employee.name}</th>
                <th>{employee.ssn}</th>
                <th>{employee.phone}</th>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EmployeeList
