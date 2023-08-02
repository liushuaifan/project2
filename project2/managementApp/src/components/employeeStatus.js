import React, {useEffect, useState} from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeesAction, updateEmployeeAction } from '../app/employeeSlice';

import './styles/employeeStatus.css'

function EmployeeStatus() {

  const dispatch = useDispatch();

  const [ReceiptisDisabled, setReceiptIsDisabled] = useState(false);
  const [EADisDisabled, setEADIsDisabled] = useState(true);
  const [I983isDisabled, setI983IsDisabled] = useState(true);
  const [I20isDisabled, setI20IsDisabled] = useState(true);

  const [receiptVisible1, setReceiptVisible1] = useState(false);
  const [receiptVisible2, setReceiptVisible2] = useState(false);
  const [receiptVisible3, setReceiptVisible3] = useState(false);

  const [EADVisible1, setEADVisible1] = useState(false);
  const [EADVisible2, setEADVisible2] = useState(false);
  const [EADVisible3, setEADVisible3] = useState(false);

  const [I983Visible1, setI983Visible1] = useState(false);
  const [I983Visible2, setI983Visible2] = useState(false);
  const [I983Visible3, setI983Visible3] = useState(false);

  const [I20Visible1, setI20Visible1] = useState(false);
  const [I20Visible2, setI20Visible2] = useState(false);
  const [I20Visible3, setI20Visible3] = useState(false);

  const [receiptFeedback, setReceiptFeedback] = useState("");
  const [EADFeedback, setEADFeedback] = useState("");
  const [I983Feedback, setI983Feedback] = useState("");
  const [I20Feedback, setI20Feedback] = useState("");

  useEffect(() => {
    dispatch(fetchEmployeesAction());
  }, []);

  const { employees } = useSelector(state => state.employees);
  const employeeId = localStorage.getItem('employeeId');

  //增加了一个新的 useEffect，它依赖于 employees。当 employees 更新时，这个 useEffect 将会运行，找到对应的员工，然后根据员工的 VisaDocumentStatus 更新 isDisabled 的状态
  useEffect(() => {
    const employee = employees && employees.find(employee => employee._id===employeeId);
    console.log(employee)
    if(employee){
      let VisaDocumentStatus = employee.visaDocumentStatus;
      let VisaDocumentLink = employee.visaDocumentLink;
      let VisaDocumentFeedback = employee.visaDocumentFeedback;

      let EADLink = VisaDocumentLink[1];
      let I983Link = VisaDocumentLink[2];
      let I20Link = VisaDocumentLink[3];

      let receiptStatus = VisaDocumentStatus[0];
      let EADStatus = VisaDocumentStatus[1];
      let I983Status = VisaDocumentStatus[2];
      let I20Status = VisaDocumentStatus[3];

      setReceiptFeedback(VisaDocumentFeedback[0])
      setEADFeedback(VisaDocumentFeedback[1])
      setI983Feedback(VisaDocumentFeedback[2])
      setI20Feedback(VisaDocumentFeedback[0])

      setReceiptIsDisabled(EADStatus === 'approved' ? true : false);
      setEADIsDisabled((EADLink === '' || I983Status === 'approved' )? true : false);
      setI983IsDisabled((I983Link === '' || I20Status === 'approved') ? true : false);
      setI20IsDisabled((I20Link === '') ? true : false);

      switch(receiptStatus){
        case 'pending':
          setReceiptVisible1(true);
          break;
        case 'approved':
          setReceiptVisible2(true);
          break;
        case 'rejected':
          setReceiptVisible3(true);
          break;
        default:
      }
      switch(EADStatus){
        case 'pending':
          setEADVisible1(true);
          break;
        case 'approved':
          setEADVisible2(true);
          break;
        case 'rejected':
          setEADVisible3(true);
          break;
        default:
      }
      switch(I983Status){
        case 'pending':
          setI983Visible1(true);
          break;
        case 'approved':
          setI983Visible2(true);
          break;
        case 'rejected':
          setI983Visible3(true);
          break;
        default:
      }
      switch(I20Status){
        case 'pending':
          setI20Visible1(true);
          break;
        case 'approved':
          setI20Visible2(true);
          break;
        case 'rejected':
          setI20Visible3(true);
          break;
        default:
      }

    }
  }, [employees])


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
          employeeId: employeeId, 
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
    <div>

      <Accordion disabled = {ReceiptisDisabled}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{backgroundColor:'WhiteSmoke'}}>
          <Typography>OPT Receipt</Typography>
        </AccordionSummary>
        <AccordionDetails className="receiptAccordion" style={{borderTop: "1px solid rgba(0, 0, 0, .125)"}}>
          {receiptVisible1 && <div className='receiptPending'>Waiting for HR to approve your OPT Receipt </div>}
          {receiptVisible2 && <div className='receiptApproved'>
            <p>Please upload a copy of your OPT EAD</p> 
            <input type="file" id="optEAD" name="filename" onChange={(e)=>handlefileSubmit(e, 'EAD')}/>
          </div>}
          {receiptVisible3 && <div className='receiptRejected'>HR's feedback: {receiptFeedback}</div>}
        </AccordionDetails>
      </Accordion>


      <Accordion disabled = {EADisDisabled}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{backgroundColor:'WhiteSmoke'}}>
          <Typography>OPT EAD</Typography>
        </AccordionSummary>
        <AccordionDetails className="eadAccordion" style={{borderTop: "1px solid rgba(0, 0, 0, .125)"}}>
          {EADVisible1 && <div className='eadPending'>Waiting for HR to approve your OPT EAD </div>}
          {EADVisible2 && <div className='eadApproved'>
            <p>Please download and fill out the I-983 form</p> 
            <div className='i983file'>
              <a href="/images/myw3schoolsimage.jpg" download>
                <img src="/images/myw3schoolsimage.jpg" alt="Empty Template" width="104" height="142" />
              </a>
              <a href="/images/myw3schoolsimage.jpg" download>
                <img src="/images/myw3schoolsimage.jpg" alt="Sample Template" width="104" height="142" />
              </a>
              <input type="file" id="I-983" name="filename" onChange={(e)=>handlefileSubmit(e, 'I983')}/>
            </div>
          </div>}
          {EADVisible3 && <div className='eadRejected'>HR's feedback {EADFeedback}</div>}
        </AccordionDetails>
      </Accordion>


      <Accordion disabled = {I983isDisabled}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{backgroundColor:'WhiteSmoke'}}>
          <Typography>I-983</Typography>
        </AccordionSummary>
        <AccordionDetails className="i983Accordion" style={{borderTop: "1px solid rgba(0, 0, 0, .125)"}}>
          {I983Visible1 && <div className='i983Pending'>Waiting for HR to approve and sign your I-983</div>}     
          {I983Visible2 &&           
            <div className='i983Approved'>
              <p>Please send the I-983 along with all necessary documents to your school and upload the new I-20</p>
              <input type="file" id="I-20" name="filename" onChange={(e)=>handlefileSubmit(e, 'I20')}/> 
            </div>
          }
          {I983Visible3 && <div className='i983Rejected'>HR's feedback {I983Feedback}</div>}
        </AccordionDetails>
      </Accordion>


      <Accordion disabled = {I20isDisabled}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{backgroundColor:'WhiteSmoke'}}>
          <Typography>I-20</Typography>
        </AccordionSummary>
        <AccordionDetails className="i20Accordion" style={{borderTop: "1px solid rgba(0, 0, 0, .125)"}}>
        {I20Visible1 && <div className='i20Pending'>Waiting for HR to approve your I-20 </div>}
        {I20Visible2 && 
          <div className='i20Approved'>
            <p>All documents have been approved</p> 
          </div>
        }
        {I20Visible3 && <div className='i20Rejected'>HR's feedback {I20Feedback}</div>}
        </AccordionDetails>
      </Accordion>
    </div>


    
  )
}

export default EmployeeStatus
