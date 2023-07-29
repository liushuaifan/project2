import React, { useState  } from 'react';
import { Button, Form, Input } from 'antd';
import { createEmployeeAction, updateEmployeeAction } from '../app/employeeSlice';
import { useDispatch, useSelector } from 'react-redux';

import './styles/onboard.css'


function Onboard() {

  const dispatch = useDispatch();
  const handleSubmit = (data) => {
    console.log("onboarding data: ", data)
    dispatch(updateEmployeeAction({ 
      employeeId: '64bef5e47f390e96ea3c7daa',
      firstName: data.firstName, 
      lastName: data.lastName
    })).then(
    );
  };

  const [status, setStatus] = useState('');
  const [F1Selected, setF1Selected] = useState(false);
  const [OtherSelected, setOtherSelected] = useState(false);
  const handleImageUpload = ()=>{

  }

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

  const handlefileSubmit = (event, filetype) =>{
    const file = event.target.files[0];
    console.log("filetype is: ",filetype)
    // console.log("file is: ", file);

    let reader = new FileReader();
    reader.onloadend = function () {
        const base64String = reader.result.replace("data:", "")
            .replace(/^.+,/, "");
        // console.log(base64String)
        dispatch(updateEmployeeAction({ 
          employeeId: '64bef5e47f390e96ea3c7daa', 
          visaDocumentName: filetype,
          visaDocumentLink: base64String, 
          visaDocumentStatus: 'pending',
          visaDocumentFeedback: ''
        })).then(
        );
    }
    reader.readAsDataURL(file);
  }

  return (
    <div className='submitform'>

    <Form className='forms' layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="First Name" name="firstName" rules={[{required: true}]}>
        <Input.TextArea rows={1} />
      </Form.Item>

      <Form.Item label="Last Name" name="lastName" rules={[{required: true}]}>
        <Input.TextArea rows={1} />
      </Form.Item>

      {/* <div className='localimgupload'>
          <Form.Item label="Add profile picture">
            <input type="file" id="img" accept="image/*"  onChange={handleImageUpload}></input>
          </Form.Item>
        <img src={imageurl} alt="Your image" width="150" height="100" />
      </div> */}

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
      <Form.Item label="Permanent resient or citizen of US?" name="resient" >
        {/* <h4>Permanent resient or citizen of US?</h4> */}
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

              <label for="startDate">Start date:</label>
              <input type="date" id="startDate" name="startDate"/>
              <label for="endDate">End date:</label>
              <input type="date" id="endDate" name="endDate"/>
            </>
          )}      
      </Form.Item>

      <Form.Item label="Reference" name="reference" >
        <Input.TextArea rows={1} />
      </Form.Item>

      <Form.Item className='formbutton'>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
    
  </div>
  )
}

export default Onboard
