import React from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Form, Input } from 'antd';


function profile() {

  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{backgroundColor:'WhiteSmoke'}}>
          <Typography>Name</Typography>
        </AccordionSummary>
        <AccordionDetails style={{borderTop: "1px solid rgba(0, 0, 0, .125)"}}>
          <Form className='forms' layout="vertical" onFinish={(data) => {} }>
            <Form.Item label="First Name" name="firstName" rules={[{required: true}]}>
              <Input.TextArea rows={1} />
            </Form.Item>

            <Form.Item label="Last Name" name="lastName" rules={[{required: true}]}>
              <Input.TextArea rows={1} />
            </Form.Item>

            <Form.Item label="Add profile picture">
              <input type="file" id="img" accept="image/*"></input>
              </Form.Item>

            <Form.Item label="Email" name="email" rules={[{required: true}]}>
              <Input.TextArea rows={1} />
            </Form.Item>

            <Form.Item label="SSN" name="ssn" rules={[{required: true}]}>
              <Input.TextArea rows={1} />
            </Form.Item>

            <Form.Item label="Date of birth" name="dateOfBirth" rules={[{required: true}]}>
              <Input.TextArea rows={1} />
            </Form.Item>

            <Form.Item label="Gender" name="gender" rules={[{required: true}]}>
              <Input.TextArea rows={1} />
            </Form.Item>

            <Form.Item className='formbutton'>
              <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{backgroundColor:'WhiteSmoke'}}>
          <Typography>Address</Typography>
        </AccordionSummary>
        <AccordionDetails style={{borderTop: "1px solid rgba(0, 0, 0, .125)"}}>
          <Form className='forms' layout="vertical" onFinish={(data) => {} }>
            <Form.Item label="Building/apt #" name="buildingNum" rules={[{required: true}]}>
              <Input.TextArea rows={1} />
            </Form.Item>

            <Form.Item label="Street Name" name="streetName" rules={[{required: true}]}>
              <Input.TextArea rows={1} />
            </Form.Item>

            <Form.Item label="City" name="city" rules={[{required: true}]}>
              <Input.TextArea rows={1} />
            </Form.Item>

            <Form.Item label="State" name="state" rules={[{required: true}]}>
              <Input.TextArea rows={1} />
            </Form.Item>

            <Form.Item label="Zip Code" name="zip" rules={[{required: true}]}>
              <Input.TextArea rows={1} />
            </Form.Item>

            <Form.Item className='formbutton'>
              <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{backgroundColor:'WhiteSmoke'}}>
          <Typography>Contact Info</Typography>
        </AccordionSummary>
        <AccordionDetails style={{borderTop: "1px solid rgba(0, 0, 0, .125)"}}>
          <Form className='forms' layout="vertical" onFinish={(data) => {} }>
            <Form.Item label="Cell Phone Number" name="cellphone" rules={[{required: true}]}>
              <Input.TextArea rows={1} />
            </Form.Item>

            <Form.Item label="Work Phone Number" name="workphone" rules={[{required: true}]}>
              <Input.TextArea rows={1} />
            </Form.Item>
            <Form.Item className='formbutton'>
              <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{backgroundColor:'WhiteSmoke'}}>
          <Typography>Employment</Typography>
        </AccordionSummary>
        <AccordionDetails style={{borderTop: "1px solid rgba(0, 0, 0, .125)"}}>
          <Form className='forms' layout="vertical" onFinish={(data) => {} }>
            <Form.Item label="Visa Title" name="visaTitle" rules={[{required: true}]}>
              <Input.TextArea rows={1} />
            </Form.Item>

            <Form.Item label="Start Date" name="startDate" rules={[{required: true}]}>
              <Input.TextArea rows={1} />
            </Form.Item>

            <Form.Item label="End Date" name="endDate" rules={[{required: true}]}>
              <Input.TextArea rows={1} />
            </Form.Item>

            <Form.Item className='formbutton'>
              <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{backgroundColor:'WhiteSmoke'}}>
          <Typography>Emergency contact</Typography>
        </AccordionSummary>
        <AccordionDetails style={{borderTop: "1px solid rgba(0, 0, 0, .125)"}}>
          <Form className='forms' layout="vertical" onFinish={(data) => {} }>
            <Form.Item label="First Name" name="firstName" rules={[{required: true}]}>
              <Input.TextArea rows={1} />
            </Form.Item>

            <Form.Item label="Last Name" name="lastName" rules={[{required: true}]}>
              <Input.TextArea rows={1} />
            </Form.Item>

            <Form.Item label="Middle Name" name="middleName" rules={[{required: true}]}>
              <Input.TextArea rows={1} />
            </Form.Item>

            <Form.Item label="Phone" name="phone" rules={[{required: true}]}>
              <Input.TextArea rows={1} />
            </Form.Item>

            <Form.Item label="Email" name="email" rules={[{required: true}]}>
              <Input.TextArea rows={1} />
            </Form.Item>

            <Form.Item label="Relationship" name="relationship" rules={[{required: true}]}>
              <Input.TextArea rows={1} />
            </Form.Item>

            <Form.Item className='formbutton'>
              <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{backgroundColor:'WhiteSmoke'}}>
          <Typography>Documents</Typography>
        </AccordionSummary> 
        <AccordionDetails style={{borderTop: "1px solid rgba(0, 0, 0, .125)"}}>
          <Form className='forms' layout="vertical" onFinish={(data) => {} }>
            <Form.Item label="Driver license" name="driverLicense" rules={[{required: true}]}>
              <input type="file" id="driverLicense" name="filename" /> 
            </Form.Item>

            <Form.Item label="Work Authorization" name="workAuthorization" rules={[{required: true}]}>
              <input type="file" id="workAuthorization" name="filename" />
            </Form.Item>

            <Form.Item className='formbutton'>
              <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>
        </AccordionDetails>
      </Accordion>

    </div>
  )
}

export default profile
