import React, {useState} from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { updateEmployeeAction } from '../app/employeeSlice';

function HrStatusEmployee({employee}) {

  const dispatch = useDispatch();
  console.log(employee)
  let index = employee.visaDocumentStatus.indexOf('pending')
  const [feedback, setFeedback] = useState("");

  const handleAprrove = () => {
    dispatch(updateEmployeeAction({ 
      employeeId: '64bef5e47f390e96ea3c7daa', 
      visaDocumentName: employee.visaDocumentName[index],
      visaDocumentStatus: 'approved'
    })).then(
    );
  }

  const handleReject = () => {
    dispatch(updateEmployeeAction({ 
      employeeId: '64bef5e47f390e96ea3c7daa', 
      visaDocumentName: employee.visaDocumentName[index],
      visaDocumentStatus: 'rejected',
      visaDocumentFeedback: feedback
    })).then(
    );
  }

  const handleOnChange = (e) => {
    setFeedback(e.target.value);
  }

  return ((
    employee && 
    <div>
      <div>{employee.firstName}</div>
      <div>{employee.visaDocumentName[index]}</div>
      <div>{employee.visaDocumentStatus[index]}</div>
      <div>{
        employee.visaDocumentLink[index]==="" ? "Not yet submitted" : (
          <>
            <div>{employee.visaDocumentLink[index]}</div>  
            <div><button onClick={handleAprrove}>Approve</button></div>  
            <input type="text" id="fname" name="fname" onChange={(e) => handleOnChange(e)}/>
            <div><button onClick={handleReject}>Reject</button></div> 
          </>
        )}</div>
    </div>
  ))
}

export default HrStatusEmployee