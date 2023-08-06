import React, {useEffect, useState} from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { updateEmployeeAction } from '../app/employeeSlice';

import './styles/hrStatusEmployee.css'

function HrStatusEmployee({employee}) {

  const dispatch = useDispatch();
  let index = employee.visaDocumentStatus.indexOf('pending')===-1 ? employee.visaDocumentStatus.indexOf('unsubmitted') : employee.visaDocumentStatus.indexOf('pending');
  let rejectIndex = employee.visaDocumentStatus.indexOf('rejected');
  const [feedback, setFeedback] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
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
    console.log()
    if(index!==-1 && employee.visaDocumentLink[index]!==""){
      const blob = b64toBlob(employee.visaDocumentLink[index], "application/pdf");
      const blobUrl = URL.createObjectURL(blob);
      setPdfUrl(blobUrl);
    }
  }, []);


  const handleAprrove = () => {
    dispatch(updateEmployeeAction({ 
      employeeId: employee._id, 
      visaDocumentName: employee.visaDocumentName[index],
      visaDocumentStatus: 'approved'
    })).then(
    );
  }

  const handleReject = () => {
    dispatch(updateEmployeeAction({ 
      employeeId: employee._id, 
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
    <tr key={employee.id}>
      <th>{employee.firstName}</th>
      <th>OPT</th>
      {index!==-1 ? rejectIndex!==-1? 
      <>
        <th>{employee.visaDocumentName[rejectIndex]}</th>
        <th>{employee.visaDocumentStatus[rejectIndex]}</th>
        <th>Waiting for resubmission</th>
      </> : 
      <>
        <th>{employee.visaDocumentName[index]}</th>
        <th>{employee.visaDocumentStatus[index]}</th>
        <th>{
          employee.visaDocumentLink[index]==="" ? "Not yet submitted" : (
            <>
              <a href={pdfUrl}>Download Pdf file</a>
              <div><button onClick={handleAprrove}>Approve</button></div>  
              <input type="text" id="fname" name="fname" onChange={(e) => handleOnChange(e)}/>
              <div><button onClick={handleReject}>Reject</button></div> 
            </>
        )}</th>
      </>
      
      
       : "All done" }
      
    </tr>
  ))
}

export default HrStatusEmployee