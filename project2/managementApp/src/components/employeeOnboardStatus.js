import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeesAction,updateEmployeeAction } from '../app/employeeSlice';

function EmployeeOnboardStatus() {

  const dispatch = useDispatch();
  const { employeeId } = useParams();

  useEffect(() => {
    dispatch(fetchEmployeesAction());
  }, []);


  const { employees, isLoading } = useSelector(state => state.employees);
  const [feedback, setFeedback] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");

  const employee = employees && employees.find(employee => employee._id===employeeId);
  employee && console.log("Selected employee is:", employee)

  useEffect(() => {
    console.log("employee", employee)
    const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
      const byteCharacters = atob(b64Data);
      const byteArrays = [];
    
      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
    
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
    
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
    
      const blob = new Blob(byteArrays, {type: contentType});
      return blob;
    }
    if(employee && employee.visaDocumentLink[0]!==""){
      const blob = b64toBlob(employee.visaDocumentLink[0], "application/pdf");
      const blobUrl = URL.createObjectURL(blob);
      setPdfUrl(blobUrl);
    }
  }, [employee]);

  const handleAprrove = () => {
    dispatch(updateEmployeeAction({ 
      employeeId: employee._id, 
      visaDocumentName: employee.visaDocumentName[0],
      visaDocumentStatus: 'approved'
    })).then(
    );
  }

  const handleReject = () => {
    dispatch(updateEmployeeAction({ 
      employeeId: employee._id, 
      visaDocumentName: employee.visaDocumentName[0],
      visaDocumentStatus: 'rejected',
      visaDocumentFeedback: feedback
    })).then(
    );
  }

  const handleOnChange = (e) => {
    setFeedback(e.target.value);
  }

  return (
    isLoading ? (
      <div>Loading...</div>
    ) :(employee && (
      <>
        <div>First Name: {employee.firstName}</div>
        <div>Last Name: {employee.lastName}</div>
        <div>Email: {employee.email}</div>
        <div>
          {employee.visaDocumentLink[0]==="" ? "Not yet submitted" : (employee.visaDocumentStatus[0]==="approved"? "Document Approved" : (
            employee.visaDocumentStatus[0]==="rejected" ? "Document Rejected" :  
          <>
            <a href={pdfUrl}>Download Pdf file</a>
            <div><button onClick={handleAprrove}>Approve</button></div>  
            <input type="text" id="fname" name="fname" onChange={(e) => handleOnChange(e)}/>
            <div><button onClick={handleReject}>Reject</button></div> 
          </>
          ))
}
        </div>
      </>))
    )
    
}

export default EmployeeOnboardStatus