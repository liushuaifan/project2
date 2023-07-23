import React, {useEffect, useState} from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeesAction, updateEmployeeAction } from '../app/employeeSlice';

import './styles/employeeStatus.css'

function EmployeeStatus() {

  const dispatch = useDispatch();

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    dispatch(fetchEmployeesAction());
  }, []);

  const { employees } = useSelector(state => state.employees);

  //增加了一个新的 useEffect，它依赖于 employees。当 employees 更新时，这个 useEffect 将会运行，找到对应的员工，然后根据员工的 VisaDocumentStatus 更新 isDisabled 的状态
  useEffect(() => {
    const employee = employees && employees.find(employee => employee._id==='64bb9ff34f7000182bd7d11c');
    console.log(employee)
  
    let VisaDocumentName = employee && employee.visaDocumentName;
    let VisaDocumentStatus = employee && employee.visaDocumentStatus;
    let index = VisaDocumentName && VisaDocumentName.indexOf('EAD')
    let currentVisaStatus = VisaDocumentStatus && VisaDocumentStatus[index];
    console.log('currentVisaStatus: ', currentVisaStatus);
    setIsDisabled(currentVisaStatus === 'approved' ? false : true);
  }, [employees])


  const handleEADSubmit = (event) =>{
    const file = event.target.files[0];
    console.log("file is: ", file);
    dispatch(updateEmployeeAction({ 
      employeeId: '64bb9ff34f7000182bd7d11c', 
      visaDocumentName: ['EAD'],
      visaDocumentLink: [file.name], 
      visaDocumentStatus: ['pending']
    })).then(
    );
  }

  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{backgroundColor:'WhiteSmoke'}}>
          <Typography>OPT Receipt</Typography>
        </AccordionSummary>
        <AccordionDetails className="receiptAccordion" style={{borderTop: "1px solid rgba(0, 0, 0, .125)"}}>
          <div className='receiptPending'>Waiting for HR to approve your OPT Receipt </div>
          <div className='receiptApproved'>
            <p>Please upload a copy of your OPT EAD</p> 
            <input type="file" id="optEAD" name="filename" onChange={handleEADSubmit}/>
          </div>
          <div className='receiptRejected'>HR's feedback</div>
        </AccordionDetails>
      </Accordion>
      <Accordion disabled = {isDisabled}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{backgroundColor:'WhiteSmoke'}}>
          <Typography>OPT EAD</Typography>
        </AccordionSummary>
        <AccordionDetails className="eadAccordion" style={{borderTop: "1px solid rgba(0, 0, 0, .125)"}}>
          <div className='eadPending'>Waiting for HR to approve your OPT EAD </div>
          <div className='eadApproved'>
            <p>Please download and fill out the I-983 form</p> 
          </div>
          <div className='eadRejected'>HR's feedback</div>
        </AccordionDetails>
      </Accordion>
      <Accordion disabled>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{backgroundColor:'WhiteSmoke'}}>
          <Typography>I-983</Typography>
        </AccordionSummary>
        <AccordionDetails className="i983Accordion" style={{borderTop: "1px solid rgba(0, 0, 0, .125)"}}>
          <div className='i983file'>
            <a href="/images/myw3schoolsimage.jpg" download>
              <img src="/images/myw3schoolsimage.jpg" alt="Empty Template" width="104" height="142" />
            </a>
            <a href="/images/myw3schoolsimage.jpg" download>
              <img src="/images/myw3schoolsimage.jpg" alt="Sample Template" width="104" height="142" />
            </a>
            <input type="file" id="I-983" name="filename" />
          </div>

          <div className='i983Pending'>Waiting for HR to approve and sign your I-983</div>
          <div className='i983Approved'>
            <p>Please send the I-983 along with all necessary documents to your school and upload the new I-20</p>
            <input type="file" id="I-20" name="filename" /> 
          </div>
          <div className='i983Rejected'>HR's feedback</div>
        </AccordionDetails>
      </Accordion>
      <Accordion disabled>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{backgroundColor:'WhiteSmoke'}}>
          <Typography>I-20</Typography>
        </AccordionSummary>
        <AccordionDetails className="i20Accordion" style={{borderTop: "1px solid rgba(0, 0, 0, .125)"}}>
          <div className='i20Pending'>Waiting for HR to approve your I-20 </div>
          <div className='i20Approved'>
            <p>All documents have been approved</p> 
            <input type="file" id="I-983" name="filename" />
          </div>
          <div className='i20Rejected'>HR's feedback</div>
        </AccordionDetails>
      </Accordion>
    </div>


    
  )
}

export default EmployeeStatus
