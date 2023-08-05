import React, {useEffect, useState} from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeesAction, updateEmployeeAction } from '../app/employeeSlice';

function Profile() {

  const dispatch = useDispatch();
  const employeeId = localStorage.getItem('employeeId')
  
  useEffect(() => {
    dispatch(fetchEmployeesAction());
  }, []);

  const { employees } = useSelector(state => state.employees);

  const employee = employees && employees.find(employee => employee._id===employeeId);

  const onSubmit = (data) => {
    dispatch(updateEmployeeAction({ 
      employeeId: employeeId, 
      firstName: data.firstName
     }));
     setNameDisabled(true);
  } 

  const handleEdit = (e) => {
    e.preventDefault();
    setNameDisabled(false);
  }

  const [nameDisabled, setNameDisabled] = useState('true');
  const [addressDisabled, setAddressDisabled] = useState('true');
  const [contactDisabled, setContactDisabled] = useState('true');
  const [employmentDisabled, setEmploymentDisabled] = useState('true');
  const [emergencyDisabled, setEmergencyDisabled] = useState('true');

  return (
    employee && (
      <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{backgroundColor:'WhiteSmoke'}}>
          <Typography>Name</Typography>
        </AccordionSummary>
        <AccordionDetails style={{borderTop: "1px solid rgba(0, 0, 0, .125)"}}>
          <Form className='forms' layout="vertical" onFinish={onSubmit}>
            <Form.Item label="First Name" name="firstName" rules={[{required: true}]} initialValue={employee.firstName}>
              <Input.TextArea rows={1} disabled={nameDisabled}/>
            </Form.Item>

            <Form.Item label="Last Name" name="lastName" rules={[{required: true}]} initialValue={employee.lastName}>
              <Input.TextArea rows={1} disabled={nameDisabled}/>
            </Form.Item>

            <Form.Item label="Add profile picture">
              <input type="file" id="img" accept="image/*"></input>
              </Form.Item>

            <Form.Item label="Email" name="email" rules={[{required: true}]} initialValue={employee.email}>
              <Input.TextArea rows={1} disabled={nameDisabled}/>
            </Form.Item>

            <Form.Item label="SSN" name="ssn" rules={[{required: true}]} initialValue={employee.ssn}>
              <Input.TextArea rows={1} />
            </Form.Item>

            <Form.Item label="Date of birth" name="dateOfBirth" rules={[{required: true}]} initialValue={employee.dateOfBirth}>
              <Input.TextArea rows={1} />
            </Form.Item>

            <Form.Item label="Gender" name="gender" rules={[{required: true}]} initialValue={employee.gender}>
              <Input.TextArea rows={1} />
            </Form.Item>

            <Form.Item className='formbutton'>
              <Button type="primary" onClick={handleEdit}>Edit</Button>
            </Form.Item>
            <Form.Item className='formbutton'>
              <Button type="primary" htmlType="submit">Save</Button>
            </Form.Item>
          </Form>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{backgroundColor:'WhiteSmoke'}}>
          <Typography>Address</Typography>
        </AccordionSummary>
        <AccordionDetails style={{borderTop: "1px solid rgba(0, 0, 0, .125)"}}>
          <Form className='forms' layout="vertical" onFinish={onSubmit}>
            <Form.Item label="Building/apt" name="Building/apt" rules={[{required: true}]}>
              <Input.TextArea rows={1} disabled={addressDisabled}/>
            </Form.Item>

            <Form.Item label="street name" name="street name" rules={[{required: true}]}>
              <Input.TextArea rows={1} disabled={addressDisabled}/>
            </Form.Item>

            <Form.Item label="city" name="city" rules={[{required: true}]}>
              <Input.TextArea rows={1} disabled={addressDisabled}/>
            </Form.Item>

            <Form.Item label="state" name="state" rules={[{required: true}]}>
              <Input.TextArea rows={1} disabled={addressDisabled}/>
            </Form.Item>

            <Form.Item label="zip" name="zip" rules={[{required: true}]}>
              <Input.TextArea rows={1} disabled={addressDisabled}/>
            </Form.Item>
            <Form.Item className='formbutton'>
              <Button type="primary" onClick={handleEdit}>Edit</Button>
            </Form.Item>
            <Form.Item className='formbutton'>
              <Button type="primary" htmlType="submit">Save</Button>
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
              <Input.TextArea rows={1} disabled={contactDisabled}/>
            </Form.Item>

            <Form.Item label="Work Phone Number" name="workphone" rules={[{required: true}]}>
              <Input.TextArea rows={1} disabled={contactDisabled}/>
            </Form.Item>
            <Form.Item className='formbutton'>
              <Button type="primary" onClick={handleEdit}>Edit</Button>
            </Form.Item>
            <Form.Item className='formbutton'>
              <Button type="primary" htmlType="submit">Save</Button>
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
              <Input.TextArea rows={1} disabled={employmentDisabled}/>
            </Form.Item>

            <Form.Item label="Start Date" name="startDate" rules={[{required: true}]}>
              <Input.TextArea rows={1} disabled={employmentDisabled}/>
            </Form.Item>

            <Form.Item label="End Date" name="endDate" rules={[{required: true}]}>
              <Input.TextArea rows={1} disabled={employmentDisabled}/>
            </Form.Item>

            <Form.Item className='formbutton'>
              <Button type="primary" onClick={handleEdit}>Edit</Button>
            </Form.Item>
            <Form.Item className='formbutton'>
              <Button type="primary" htmlType="submit">Save</Button>
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
              <Input.TextArea rows={1} disabled={emergencyDisabled}/>
            </Form.Item>

            <Form.Item label="Last Name" name="lastName" rules={[{required: true}]}>
              <Input.TextArea rows={1} disabled={emergencyDisabled}/>
            </Form.Item>

            <Form.Item label="Middle Name" name="middleName" rules={[{required: true}]}>
              <Input.TextArea rows={1} disabled={emergencyDisabled}/>
            </Form.Item>

            <Form.Item label="Phone" name="phone" rules={[{required: true}]}>
              <Input.TextArea rows={1} disabled={emergencyDisabled}/>
            </Form.Item>

            <Form.Item label="Email" name="email" rules={[{required: true}]}>
              <Input.TextArea rows={1} disabled={emergencyDisabled}/>
            </Form.Item>

            <Form.Item label="Relationship" name="relationship" rules={[{required: true}]}>
              <Input.TextArea rows={1} disabled={emergencyDisabled}/>
            </Form.Item>

            <Form.Item className='formbutton'>
              <Button type="primary" onClick={handleEdit}>Edit</Button>
            </Form.Item>
            <Form.Item className='formbutton'>
              <Button type="primary" htmlType="submit">Save</Button>
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
              <Button type="primary" onClick={handleEdit}>Edit</Button>
            </Form.Item>
            <Form.Item className='formbutton'>
              <Button type="primary" htmlType="submit">Save</Button>
            </Form.Item>
          </Form>
        </AccordionDetails>
      </Accordion> 

    </div>

    )




  )
}

export default Profile
