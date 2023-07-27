import React from 'react';
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

  const handleImageUpload = ()=>{

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

      <div className='localimgupload'>
          <Form.Item label="Add profile picture">
            <input type="file" id="img" accept="image/*"  onChange={handleImageUpload}></input>
          </Form.Item>
        {/* <img src={imageurl} alt="Your image" width="150" height="100" /> */}
      </div>

      <Form.Item label="current address" name="currentaddress" >
        <Input.TextArea rows={1} />
      </Form.Item>

      <Form.Item label="cellphone number" name="cellphonenumber" >
        <Input.TextArea rows={1} />
      </Form.Item>

      <h4>Permanent resient or citizen of US?</h4>

      <Form.Item label="Reference" name="reference" >
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

      <Form.Item className='formbutton'>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
    
  </div>
  )
}

export default Onboard
