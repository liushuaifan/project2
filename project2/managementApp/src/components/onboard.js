import React, { useEffect, useState  } from 'react';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { createEmployeeAction, fetchEmployeesAction, updateEmployeeAction } from '../app/employeeSlice';
import { useDispatch, useSelector } from 'react-redux';

import './styles/onboard.css'


function Onboard() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employeeId = localStorage.getItem('employeeId')

  const [status, setStatus] = useState('');
  const [F1Selected, setF1Selected] = useState(false);
  const [OtherSelected, setOtherSelected] = useState(false);
  const [onboardStatus, setOnboardStatus] = useState('');
  const [file, setFile] = useState("");

  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(()=>{
    dispatch(fetchEmployeesAction());
  }, [])

  const [employee, setEmployee] = useState(null);

  const { employees } = useSelector(state => state.employees);
  
  useEffect(() => {
    if(employees){
      const matchedEmployee = employees.find(emp => emp._id === employeeId);
      setEmployee(matchedEmployee);
    }

  }, [employees, employeeId]);
  
  useEffect(() => {
    if (employee) {
      // console.log("Selected employee is:", employee)
      const VisaDocumentLink = employee.visaDocumentLink;
      const visaDocumentStatus = employee.visaDocumentStatus;
      if (visaDocumentStatus[0] === 'unsubmitted') {
        setOnboardStatus('unsubmitted');
      } else if (visaDocumentStatus[0] === 'approved') {
        navigate('/employee/profile')
      } else if (visaDocumentStatus[0] === 'pending') {
        setOnboardStatus('pending');
      } else if(visaDocumentStatus[0] === 'rejected'){
        setOnboardStatus('rejected');
      }
    } else {
      console.log("No employee found with id:", employeeId);
    }
  }, [employee, employeeId, navigate]);


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
    if(employee && employee.visaDocumentLink[0]!==""){
      const blob = b64toBlob(employee.visaDocumentLink[0], "application/pdf");
      const blobUrl = URL.createObjectURL(blob);
      setPdfUrl(blobUrl);
    }
  }, [employee]);

  const handleImageUpload = ()=>{

  }

  const handleSubmit = (data) => {
    console.log("onboarding data: ", data)
    dispatch(updateEmployeeAction({ 
      employeeId: employeeId,
      firstName: data.firstName, 
      lastName: data.lastName,
      address: data.currentaddress,
      cellPhone: data.cellphonenumber,
      ssn: data.SSN,
      birthday: data.dateofbirth,
      gender: data.gender,
      visaTitle: "F1(OPT)",
      emergencyFirstName: data.referfirstName,
      emergencyLastName: data.referlastName,
      emergencyRelationship: data.relationship

    })).then(
    );
    let reader = new FileReader();
    reader.onloadend = function () {
        const base64String = reader.result.replace("data:", "")
            .replace(/^.+,/, "");
        dispatch(updateEmployeeAction({ 
          employeeId: employeeId, 
          visaDocumentName: 'Receipt',
          visaDocumentLink: base64String, 
          visaDocumentStatus: 'pending',
          visaDocumentFeedback: ''
        })).then(
        );
    }
    reader.readAsDataURL(file);
  };

  const handleSelect= (visaType)=> {
    if(visaType==="F1"){
      setF1Selected(true);
      setOtherSelected(false);
    }else if(visaType==="other"){
      setOtherSelected(true);
      setF1Selected(false);
    }else{
      setF1Selected(false);
      setOtherSelected(false);
    }
  }

  const handlefileSubmit = (event) =>{
    const file = event.target.files[0];
    setFile(file);
  }

  let content;

  if (onboardStatus === 'unsubmitted') {
    content = 
    <div>
      <div className='submitform'>
        <Form className='forms' layout="vertical" onFinish={handleSubmit} >
          <Form.Item label="First Name" name="firstName" rules={[{required: true}]}>
            <Input.TextArea rows={1} />
          </Form.Item>

          <Form.Item label="Last Name" name="lastName" rules={[{required: true}]}>
            <Input.TextArea rows={1} />
          </Form.Item>

          <Form.Item label="Current Address" name="currentaddress" >
            <Input.TextArea rows={1} />
          </Form.Item>

          <Form.Item label="Cellphone Number" name="cellphonenumber" >
            <Input.TextArea rows={1} />
          </Form.Item>

          <Form.Item label="SSN" name="SSN" >
            <Input.TextArea rows={1} />
          </Form.Item>

          <Form.Item label="Date of Birth" name="dateofbirth" >
            <input type="date" id="dateofbirth" name="dateofbirth"/>
          </Form.Item>

          <Form.Item label="Gender" name="gender" >
            <Input.TextArea rows={1} />
          </Form.Item>
          
          <Form.Item label="Permanent resient or citizen of US?" name="resient" >
            <label>
                <input
                  type="radio"
                  name="status"
                  value="yes"
                  onChange={(e) => setStatus(e.target.value)}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="no"
                  onChange={(e) => setStatus(e.target.value)}
                />
                No
              </label>
              {status === 'yes' && (
                <>
                  <label for="resident">Resident Type</label>
                  <select name="resident" id="resident">
                    <option value="greenCard">Green Card</option>
                    <option value="citizen">Citizen</option>
                  </select>
                </>
              )}
              {status === 'no' && (
                <>
                  <label for="workAuthorization">What is your work authorization?</label>
                  <select name="workAuthorization" id="workAuthorization" onChange={(e) => handleSelect(e.target.value)}>
                    <option value="H1-B">H1-B</option>
                    <option value="L2">L2</option>
                    <option value="F1">F1(CPT/OPT)</option>
                    <option value="H4">H4</option>
                    <option value="other">Other</option>
                  </select>
                  {F1Selected && 
                  <div className='receiptBox'>
                    <p>Please upload a copy of your OPT Receipt</p> 
                    <input type="file" id="optReceipt" name="filename" onChange={(e)=>handlefileSubmit(e, 'Receipt')}/>
                  </div>}
                  {OtherSelected && 
                    <div className='otherBox'>
                      <p>Please enter the visa title</p> 
                      <input type="text" id="other" name="other"/>
                  </div>}

                  {/* <label for="startDate">Start date:</label>
                  <input type="date" id="startDate" name="startDate"/>
                  <label for="endDate">End date:</label>
                  <input type="date" id="endDate" name="endDate"/> */}
                </>
              )}      
          </Form.Item>

          <div>Your Reference</div>
          <Form.Item label="First Name" name="referfirstName" >
            <Input.TextArea rows={1} />
          </Form.Item>
          <Form.Item label="Last Name" name="referlastName" >
            <Input.TextArea rows={1} />
          </Form.Item>
          <Form.Item label="Relationship" name="relationship" >
            <Input.TextArea rows={1} />
          </Form.Item>

          <Form.Item className='formbutton'>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </div>  
    </div>;
  } else if (onboardStatus === 'pending') {
    content = employee && (<div>
      <div className='submitform'>
        <div> Please wait for HR to review your application. </div>
        <Form className='forms' layout="vertical" onFinish={handleSubmit} >
          <Form.Item label="First Name" name="firstName" rules={[{required: true}]} initialValue={employee.firstName}>
            <Input.TextArea rows={1} disabled/>
          </Form.Item>
  
          <Form.Item label="Last Name" name="lastName" rules={[{required: true}]} initialValue={employee.lastName}>
            <Input.TextArea rows={1} disabled/>
          </Form.Item>
  
          <Form.Item label="current address" name="currentaddress" >
            <Input.TextArea rows={1} />
          </Form.Item>
  
          <Form.Item label="cellphone number" name="cellphonenumber" >
            <Input.TextArea rows={1} />
          </Form.Item>
  
          <Form.Item label="SSN" name="SSN" >
            <Input.TextArea rows={1} />
          </Form.Item>
  
          <Form.Item label="Date of Birth" name="dateofbirth" >
            <Input.TextArea rows={1} />
          </Form.Item>
  
          <Form.Item label="Gender" name="gender" >
            <Input.TextArea rows={1} />
          </Form.Item>
  
          <Form.Item label="Reference" name="reference" >
            <Input.TextArea rows={1} />
          </Form.Item>
  
          <Form.Item label="Submitted Document" name="document" >
              <a href={pdfUrl}>Download Pdf file</a>
          </Form.Item>
        </Form>
      </div>  
    </div>);
  } else if (onboardStatus === 'rejected') {
    content = employee && (<div>
      <div className='submitform'>
        <div> Your Request Is Rejected. Please Resubmit Your Information </div>
        <Form.Item label="Feedback" name="Feedback" rules={[{required: true}]}>
            <div>{employee.visaDocumentFeedback[0]}</div>
          </Form.Item>
        <Form className='forms' layout="vertical" onFinish={handleSubmit} >
          <Form.Item label="First Name" name="firstName" rules={[{required: true}]} initialValue={employee.firstName}>
            <Input.TextArea rows={1} />
          </Form.Item>
  
          <Form.Item label="Last Name" name="lastName" rules={[{required: true}]} initialValue={employee.lastName}>
            <Input.TextArea rows={1} />
          </Form.Item>
  
          <Form.Item label="Current address" name="currentaddress" initialValue={employee.address}>
            <Input.TextArea rows={1} />
          </Form.Item>
  
          <Form.Item label="Cellphone number" name="cellphonenumber" initialValue={employee.cellPhone}>
            <Input.TextArea rows={1} />
          </Form.Item>
  
          <Form.Item label="SSN" name="SSN" initialValue={employee.ssn}>
            <Input.TextArea rows={1} />
          </Form.Item>
  
          <Form.Item label="Date of Birth" name="dateofbirth" initialValue={employee.birthday}>
            <input type="date" id="dateofbirth" name="dateofbirth"/>
          </Form.Item>
  
          <Form.Item label="Gender" name="gender" initialValue={employee.gender}>
            <Input.TextArea rows={1} />
          </Form.Item>
  
          <Form.Item label="Permanent resient or citizen of US?" name="resient" >
            <label>
                <input
                  type="radio"
                  name="status"
                  value="yes"
                  onChange={(e) => setStatus(e.target.value)}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="no"
                  onChange={(e) => setStatus(e.target.value)}
                />
                No
              </label>
              {status === 'yes' && (
                <>
                  <label for="resident">Resident Type</label>
                  <select name="resident" id="resident">
                    <option value="greenCard">Green Card</option>
                    <option value="citizen">Citizen</option>
                  </select>
                </>
              )}
              {status === 'no' && (
                <>
                  <label for="workAuthorization">What is your work authorization?</label>
                  <select name="workAuthorization" id="workAuthorization" onChange={(e) => handleSelect(e.target.value)}>
                    <option value="H1-B">H1-B</option>
                    <option value="L2">L2</option>
                    <option value="F1">F1(CPT/OPT)</option>
                    <option value="H4">H4</option>
                    <option value="other">Other</option>
                  </select>
                  {F1Selected && 
                  <div className='receiptBox'>
                    <p>Please upload a copy of your OPT Receipt</p> 
                    <input type="file" id="optReceipt" name="filename" onChange={(e)=>handlefileSubmit(e, 'Receipt')}/>
                  </div>}
                  {OtherSelected && 
                    <div className='otherBox'>
                      <p>Please enter the visa title</p> 
                      <input type="text" id="other" name="other"/>
                  </div>}

                  {/* <label for="startDate">Start date:</label>
                  <input type="date" id="startDate" name="startDate"/>
                  <label for="endDate">End date:</label>
                  <input type="date" id="endDate" name="endDate"/> */}
                </>
              )}      
          </Form.Item>

          <div>Your Reference</div>
          <Form.Item label="First Name" name="referfirstName" initialValue={employee.emergencyFirstName}>
            <Input.TextArea rows={1} />
          </Form.Item>
          <Form.Item label="Last Name" name="referlastName" initialValue={employee.emergencyLastName}>
            <Input.TextArea rows={1} />
          </Form.Item>
          <Form.Item label="Relationship" name="relationship" initialValue={employee.emergencyRelationship}>
            <Input.TextArea rows={1} />
          </Form.Item>
  
          <Form.Item className='formbutton'>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </div>  
    </div>);
  } else {
    content = <div>Loading ...............</div>;
  }


  return (
    <div>
      {content}
    </div>
  )
}

export default Onboard
