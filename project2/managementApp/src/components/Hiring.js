import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate } from "react-router-dom";
import {createToken, fetchTokens} from '../services/token';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeesAction } from '../app/employeeSlice';

export default function Hiring() {
  const form = useRef();
  const [employeeTokens, setEmployeeTokens] = useState([]);

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    token:''
  });
  const dispatch = useDispatch();
  const navigate = new useNavigate();

  useEffect(() => {
    dispatch(fetchEmployeesAction());
  }, []);

  const { employees } = useSelector(state => state.employees);

  useLayoutEffect(() => {

    async function fetchData() {

      try {
        const result = await fetchTokens();
        console.log(result);
        setEmployeeTokens(result);
      } catch (error) {
        console.error("Error fetching user cart: ", error);
      }
    }
    fetchData();
  }, []);

  useEffect(()=>{
    async function fetchData() {

      try {
        const result = await fetchTokens();
        setEmployeeTokens(result);
      } catch (error) {
        console.error("Error fetching user cart: ", error);
      }
    }
    fetchData();
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
};


  const sendEmail = (e) => {
    e.preventDefault();
    const data = {
      name:formData.name,
      email:formData.email,
      link:"http://localhost:3000/registration/" + formData.token,
      status:false
    }
    createToken(data);
    emailjs.sendForm('service_semiw8o', 'template_kztv09o', form.current, 'KlDZS97p8hXy1fZBm')
      .then((result) => {
          console.log(result.text);
     
      }, (error) => {
          console.log(error.text);
      });
  };

  const handleView = (email) => {
    const employee = employees && employees.find(employee => employee.email===email);
    navigate(`/hr/hiring/${employee._id}`);
  }


  return (
    <div>
      <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="name"  value={formData.name} id="name" onChange={handleChange}  />
      <label  htmlFor="user_email">Email</label>
      <input type="email" name="email" value={formData.email} id="email" onChange={handleChange} />
      <label  htmlFor="token">token</label>
      <input type="token" name="token" value={formData.token} id="token" onChange={handleChange} />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
      </form>


      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>email</th>
              <th>token</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {employeeTokens.map((employee => (
              <tr key={employee._id}>
                <th>{employee.name}</th>
                <th >{employee.email}</th>
                <th>{employee.link}</th>
                <th>{employee.status}</th>
                <th><button onClick={()=> handleView(employee.email)}>View</button></th>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
    </div>
  )
}




