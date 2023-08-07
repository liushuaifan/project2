import React, {useState, useEffect, useLayoutEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeesAction, updateEmployeeAction } from '../app/employeeSlice';
import { DataGrid } from '@mui/x-data-grid';
import './styles/employeelist.css'



const columns = [

  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },

];

var rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];


function EmployeeList() {

  const navigate = new useNavigate();
  const dispatch = useDispatch();
  const [isLoading,setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchEmployeesAction());
  }, []);


  const [input, setInput] = useState("");
  const { employees } = useSelector(state => state.employees);
  rows = employees;
  console.log(11+" "+employees)

  const handleClick = (employee) => {
    navigate(`/hr/employeeList/${employee._id}`);
  }

  const handleInput=(e)=>{
    setInput(e.target.value);
  }

  return (

      <div className='wrapper'>
        <input type="text" id="fname" name="fname" onChange={(e)=>handleInput(e)}/> search for an employee by first name or last name
        <table className="table">
          <thead className="thead">
            <tr lassName="trHead">
              <th className="th">Name</th>
              <th className="th">SSN</th>
              <th className="th">Work Authorization</th>
              <th className="th">Phone number</th>
              <th className="th">Email</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {employees && employees.filter(employee=> input==="" || employee.firstName.includes(input) || employee.lastName.includes(input)).map((employee => (
              <tr className="trBody" key={employee.id}>
                <td className="td" onClick={()=> handleClick(employee)}>{employee.firstName}  {employee.lastName}</td>
                <td className="td" >{employee.ssn}</td>
                <td className="td" >{employee.visaTitle}</td>
                <td className="td" >{employee.cellPhone}</td>
                <td className="td" >{employee.email}</td>
              </tr>
            )))}
          </tbody>
        </table>

      </div>

    //   <div style={{ height: 400, width: '100%' }}>
    //   <DataGrid
    //     rows={employees}
    //     columns={columns}
    //     getRowId={(row) =>  row.lastName + row.firstName}
    //     isLoading={isLoading}
    //     initialState={{
    //       pagination: {
    //         paginationModel: { page: 0, pageSize: 5 },
    //       },
    //     }}
    //     pageSizeOptions={[5, 10]}
    //     checkboxSelection
    //   />
    // </div>
  )
}

export default EmployeeList
