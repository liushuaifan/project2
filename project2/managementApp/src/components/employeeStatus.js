import React from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Form, Input } from 'antd';
import './styles/employeeStatus.css'

function employeeStatus() {
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
            <input type="file" id="optEAD" name="filename" />
          </div>
          <div className='receiptRejected'>HR's feedback</div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
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
      <Accordion>
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

export default employeeStatus
