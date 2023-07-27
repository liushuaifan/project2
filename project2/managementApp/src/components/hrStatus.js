import React, {useEffect, useState} from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Form, Input } from 'antd';
import HrStatusEmployee from './hrStatusEmployee';
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

  // const { hrs } = useSelector(state => state.hrs);
  // console.log("hrs: ", hrs)

  return (
    <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Work authorization</th>
              <th>next steps</th>
              <th>status</th>
              <th>next actions</th>
            </tr>
          </thead>
          <tbody>
            {employees && employees.map((employee => (
              <HrStatusEmployee employee = {employee}/>
            )))}
          </tbody>
        </table>
    </div>
  )
}

export default HrStatus
