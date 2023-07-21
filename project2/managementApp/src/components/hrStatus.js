import React,{useState} from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Form, Input } from 'antd';

function HrStatus() {

  const [employees, setEmployees] = useState([{id:'0', name: 'Jason', ssn: '000-000-000', phone: '000-000-000'},
  {id:'1', name: 'Ruler', ssn: '000-000-000', phone: '000-000-000'},
  {id:'2', name: 'Alex', ssn: '000-000-000', phone: '000-000-000'},
  {id:'3', name: 'Robert', ssn: '000-000-000', phone: '000-000-000'},
  {id:'4', name: 'Aaron', ssn: '000-000-000', phone: '000-000-000'},
  {id:'5', name: 'Jack', ssn: '000-000-000', phone: '000-000-000'}]);


  return (
    <div>
        <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{backgroundColor:'WhiteSmoke'}}>
          <Typography>in progress</Typography>
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
      </Accordion>

      <Accordion>
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
      </Accordion>
    </div>
  )
}

export default HrStatus
