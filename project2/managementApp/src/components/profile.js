import React, {useEffect, useState} from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeesAction, updateEmployeeAction } from '../app/employeeSlice';

function Profile() {

  const dispatch = useDispatch();
  const employeeId = localStorage.getItem('employeeId')
  const [receiptPdfUrl, setReceiptPdfUrl] = useState("");
  const [eadPdfUrl, setEadPdfUrl] = useState("");
  const [i983PdfUrl, setI983PdfUrl] = useState("");
  const [i20PdfUrl, setI20PdfUrl] = useState("");
  

  useEffect(() => {
    dispatch(fetchEmployeesAction());
  }, []);

  const { employees, isLoading } = useSelector(state => state.employees);

  const employee = employees && employees.find(employee => employee._id===employeeId);

  useEffect(() => {
    if(employee){
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
      if(employee.visaDocumentLink[0]!==""){
        const blob = b64toBlob(employee.visaDocumentLink[0], "application/pdf");
        const blobUrl = URL.createObjectURL(blob);
        setReceiptPdfUrl(blobUrl);
      }
      if(employee.visaDocumentLink[1]!==""){
        const blob = b64toBlob(employee.visaDocumentLink[1], "application/pdf");
        const blobUrl = URL.createObjectURL(blob);
        setEadPdfUrl(blobUrl);
      }
      if(employee.visaDocumentLink[2]!==""){
        const blob = b64toBlob(employee.visaDocumentLink[2], "application/pdf");
        const blobUrl = URL.createObjectURL(blob);
        setI983PdfUrl(blobUrl);
      }
      if(employee.visaDocumentLink[3]!==""){
        const blob = b64toBlob(employee.visaDocumentLink[3], "application/pdf");
        const blobUrl = URL.createObjectURL(blob);
        setI20PdfUrl(blobUrl);
      }
    }
   
  }, [employee]);

  const onNameSubmit = (data) => {
    dispatch(updateEmployeeAction({ 
      employeeId: employeeId, 
      firstName: data.firstName,
      lastName: data.lastName,
      ssn: data.ssn,
      birthday: data.dateOfBirth,
      gender: data.gender
     }));
     setNameDisabled(true);
  } 

  const onAddressSubmit = (data) => {
    dispatch(updateEmployeeAction({ 
      employeeId: employeeId, 
      address: data.address
     }));
     setAddressDisabled(true);
  } 
  const onEmploymentSubmit = (data) => {
    dispatch(updateEmployeeAction({ 
      employeeId: employeeId, 
      visaTitle: data.visaTitle,
      visaStartDate: data.startDate,
      visaEndDate : data.endDate
     }));
     setEmploymentDisabled(true);
  } 
  const onContactSubmit = (data) => {
    dispatch(updateEmployeeAction({ 
      employeeId: employeeId, 
      cellPhone: data.cellphone
     }));
     setContactDisabled(true);
  } 
  const onEmergencySubmit = (data) => {
    dispatch(updateEmployeeAction({ 
      employeeId: employeeId, 
      emergency: data.Name,
      emergencyRelationship: data.relationship
     }));
     setEmergencyDisabled(true);
  } 

  const handleNameEdit = (e) => {
    e.preventDefault();
    setNameDisabled(false);
  }
  const handleAddressEdit = (e) => {
    e.preventDefault();
    setAddressDisabled(false);
  }
  const handleContactEdit = (e) => {
    e.preventDefault();
    setContactDisabled(false);
  }
  const handleEmploymentEdit = (e) => {
    e.preventDefault();
    setEmploymentDisabled(false);
  }

  const handleEmergencyEdit = (e) => {
    e.preventDefault();
    setEmergencyDisabled(false);
  }

  const [nameDisabled, setNameDisabled] = useState('true');
  const [addressDisabled, setAddressDisabled] = useState('true');
  const [contactDisabled, setContactDisabled] = useState('true');
  const [employmentDisabled, setEmploymentDisabled] = useState('true');
  const [emergencyDisabled, setEmergencyDisabled] = useState('true');

  return (
    isLoading ? (
      <div>Loading...</div>
    ) : 
    employee && (
      <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{backgroundColor:'WhiteSmoke'}}>
          <Typography>Name</Typography>
        </AccordionSummary>
        <AccordionDetails style={{borderTop: "1px solid rgba(0, 0, 0, .125)"}}>
          <Form className='forms' layout="vertical" onFinish={onNameSubmit}>
            <Form.Item label="First Name" name="firstName" rules={[{required: true}]} initialValue={employee.firstName}>
              <Input.TextArea rows={1} disabled={nameDisabled}/>
            </Form.Item>

            <Form.Item label="Last Name" name="lastName" rules={[{required: true}]} initialValue={employee.lastName}>
              <Input.TextArea rows={1} disabled={nameDisabled}/>
            </Form.Item>

            {/* <Form.Item label="Add profile picture">
              <input type="file" id="img" accept="image/*"></input>
              </Form.Item> */}

            <Form.Item label="Email" name="email" rules={[{required: true}]} initialValue={employee.email}>
              <Input.TextArea rows={1} disabled/>
            </Form.Item>

            <Form.Item label="SSN" name="ssn" rules={[{required: true}]} initialValue={employee.ssn}>
              <Input.TextArea rows={1} disabled={nameDisabled}/>
            </Form.Item>

            <Form.Item label="Date of birth" name="dateOfBirth" rules={[{required: true}]} initialValue={employee.birthday}>
              <Input.TextArea rows={1} disabled={nameDisabled}/>
            </Form.Item>

            <Form.Item label="Gender" name="gender" rules={[{required: true}]} initialValue={employee.gender}>
              <Input.TextArea rows={1} disabled={nameDisabled}/>
            </Form.Item>

            <Form.Item className='formbutton'>
              <Button type="primary" onClick={handleNameEdit}>Edit</Button>
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
          <Form className='forms' layout="vertical" onFinish={onAddressSubmit}>
            <Form.Item label="Current address" name="address" rules={[{required: true}]} initialValue={employee.address}>
              <Input.TextArea rows={1} disabled={addressDisabled}/>
            </Form.Item>

            {/* <Form.Item label="street name" name="street name" rules={[{required: true}]}>
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
            </Form.Item> */}
            <Form.Item className='formbutton'>
              <Button type="primary" onClick={handleAddressEdit}>Edit</Button>
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
          <Form className='forms' layout="vertical" onFinish={onContactSubmit}>
            <Form.Item label="Cell Phone Number" name="cellphone" rules={[{required: true}]} initialValue={employee.cellPhone}>
              <Input.TextArea rows={1} disabled={contactDisabled}/>
            </Form.Item>

            <Form.Item className='formbutton'>
              <Button type="primary" onClick={handleContactEdit}>Edit</Button>
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
          <Form className='forms' layout="vertical" onFinish={onEmploymentSubmit}>
            <Form.Item label="Visa Title" name="visaTitle" rules={[{required: true}]} initialValue={employee.visaTitle}>
              <Input.TextArea rows={1} disabled={employmentDisabled}/>
            </Form.Item>

            <Form.Item label="Start Date" name="startDate" rules={[{required: true}]}>
              <Input.TextArea rows={1} disabled={employmentDisabled}/>
            </Form.Item>

            <Form.Item label="End Date" name="endDate" rules={[{required: true}]}>
              <Input.TextArea rows={1} disabled={employmentDisabled}/>
            </Form.Item>

            <Form.Item className='formbutton'>
              <Button type="primary" onClick={handleEmploymentEdit}>Edit</Button>
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
          <Form className='forms' layout="vertical" onFinish={onEmergencySubmit}>
            <Form.Item label="Name" name="Name" rules={[{required: true}]} initialValue={employee.emergency}>
              <Input.TextArea rows={1} disabled={emergencyDisabled}/>
            </Form.Item>

            {/* <Form.Item label="Phone" name="phone" rules={[{required: true}]}>
              <Input.TextArea rows={1} disabled={emergencyDisabled}/>
            </Form.Item>

            <Form.Item label="Email" name="email" rules={[{required: true}]}>
              <Input.TextArea rows={1} disabled={emergencyDisabled}/>
            </Form.Item> */}

            <Form.Item label="relationship" name="relationship" rules={[{required: true}]} initialValue={employee.emergencyRelationship}>
              <Input.TextArea rows={1} disabled={emergencyDisabled}/>
            </Form.Item>

            <Form.Item className='formbutton'>
              <Button type="primary" onClick={handleEmergencyEdit}>Edit</Button>
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
            {/* <Form.Item label="Driver license" name="driverLicense" rules={[{required: true}]}>
              <input type="file" id="driverLicense" name="filename" /> 
            </Form.Item> */}

            <Form.Item label="OPT Receipt" name="receipt">
              {receiptPdfUrl==="" ? 'Not yet submitted' : 
                <a href={receiptPdfUrl}>Download OPT Receipt</a>}
            </Form.Item>
            <Form.Item label="OPT EAD" name="ead">
              {eadPdfUrl==="" ? 'Not yet submitted' : 
                <a href={eadPdfUrl}>Download OPT EAD</a>} 
            </Form.Item>
            <Form.Item label="OPT I983" name="i983">
              {i983PdfUrl==="" ? 'Not yet submitted' : 
                <a href={i983PdfUrl}>Download OPT I983</a>}
            </Form.Item>
            <Form.Item label="OPT I20" name="i20">
              {i20PdfUrl==="" ? 'Not yet submitted' : 
                <a href={i20PdfUrl}>Download OPT I20</a>}
            </Form.Item>

            {/* <Form.Item className='formbutton'>
              <Button type="primary" onClick={handleEdit}>Edit</Button>
            </Form.Item>
            <Form.Item className='formbutton'>
              <Button type="primary" htmlType="submit">Save</Button>
            </Form.Item> */}
          </Form>
        </AccordionDetails>
      </Accordion> 

    </div>

    )




  )
}

export default Profile
