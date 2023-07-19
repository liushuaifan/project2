import React from 'react';
import './styles/onboard.css'
import { Button, Form, Input, InputNumber } from 'antd';

function onboard() {

  const handleImageUpload = ()=>{

  }

  return (
    <div className='submitform'>

    <Form className='forms' layout="vertical" onFinish={(data) => {
    } }>
      <Form.Item label="First Name" name="firstname" rules={[{required: true}]}>
        <Input.TextArea rows={1} />
      </Form.Item>

      <Form.Item label="Last Name" name="lastname" rules={[{required: true}]}>
        <Input.TextArea rows={1} />
      </Form.Item>

      <div className='localimgupload'>
          <Form.Item label="Add profile picture">
            <input type="file" id="img" accept="image/*"  onChange={handleImageUpload}></input>
          </Form.Item>
        {/* <img src={imageurl} alt="Your image" width="150" height="100" /> */}
      </div>

      <Form.Item label="current address" name="currentaddress" rules={[{required: true}]}>
        <Input.TextArea rows={1} />
      </Form.Item>

      <Form.Item label="cellphone number" name="cellphonenumber" rules={[{required: true}]}>
        <Input.TextArea rows={1} />
      </Form.Item>

      <h4>Permanent resient or citizen of US?</h4>

      <Form.Item label="Reference" name="reference" rules={[{required: true}]}>
        <Input.TextArea rows={1} />
      </Form.Item>

      <Form.Item label="SSN" name="SSN" rules={[{required: true}]}>
        <Input.TextArea rows={1} />
      </Form.Item>

      <Form.Item label="Date of Birth" name="dateofbirth" rules={[{required: true}]}>
        <Input.TextArea rows={1} />
      </Form.Item>

      <Form.Item label="Gender" name="gender" rules={[{required: true}]}>
        <Input.TextArea rows={1} />
      </Form.Item>

      <Form.Item className='formbutton'>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
    
  </div>
  )
}

export default onboard
