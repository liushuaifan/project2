import React, {useEffect, useState} from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Form, Input } from 'antd';
import HrStatusEmployee from './HrStatusEmployee';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeesAction } from '../app/employeeSlice';
import { fetchHrsAction } from '../app/hrSlice';

function HrStatus() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployeesAction());
    dispatch(fetchHrsAction());
  }, []);

  const { employees } = useSelector(state => state.employees);
  console.log("employees: ", employees)

  const { hrs } = useSelector(state => state.hrs);
  console.log("hrs: ", hrs)




  return (
    <div>
        {/* <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{backgroundColor:'WhiteSmoke'}}>
          <Typography>in progress</Typography>
        </AccordionSummary>
        <AccordionDetails className="receiptAccordion" style={{borderTop: "1px solid rgba(0, 0, 0, .125)"}}> */}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Work authorization</th>
              <th>next steps</th>
              <th>next actions</th>
            </tr>
          </thead>
          <tbody>
            {employees && employees.map((employee => (
              <HrStatusEmployee employee = {employee}/>
            )))}
          </tbody>
        </table>
        {/* </AccordionDetails>
      </Accordion> */}

      {/* <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{backgroundColor:'WhiteSmoke'}}>
          <Typography>finished</Typography>
        </AccordionSummary>
        <AccordionDetails className="receiptAccordion" style={{borderTop: "1px solid rgba(0, 0, 0, .125)"}}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Work authorization</th>
              <th>next steps</th>
              <th>next actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee => (
              <tr key={employee.id}>
                <th>{employee.name}</th>
                <th>{employee.ssn}</th>
                <th>{employee.phone}</th>
                <th>{employee.phone}</th>
              </tr>
            )))}
          </tbody>
        </table>
        </AccordionDetails>
      </Accordion> */}
    </div>
  )
}

export default HrStatus
