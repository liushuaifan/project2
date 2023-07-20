import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";

function EmployeeDetail() {

  const { employeeId } = useParams();

  const [employees, setEmployees] = useState([{id:'0', name: 'Jason', ssn: '000-000-000', phone: '000-000-000'},
  {id:'1', name: 'Ruler', ssn: '000-000-000', phone: '000-000-000'},
  {id:'2', name: 'Alex', ssn: '000-000-000', phone: '000-000-000'},
  {id:'3', name: 'Robert', ssn: '000-000-000', phone: '000-000-000'},
  {id:'4', name: 'Aaron', ssn: '000-000-000', phone: '000-000-000'},
  {id:'5', name: 'Jack', ssn: '000-000-000', phone: '000-000-000'}]);
  
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    if(employeeId){
      setEmployee(employees.find(employee => employee.id === employeeId));
    }
  }, [employeeId, employees]);

  return (
    <div className="content">
      {employee && (
        <>
          <div className='content-info'>
            <div>{employee.name}</div>
            <div>{employee.ssn}</div>
            <div>{employee.phone}</div>
          </div>
        </>
      )}
    </div>
  )
}

export default EmployeeDetail
