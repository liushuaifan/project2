import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate } from "react-router-dom";
import {createToken, fetchTokens} from '../services/token'

export default function Hiring() {
  const form = useRef();
  const [employees, setEmployees] = useState([{id:'0', name: 'Jason', ssn: '000-000-000', phone: '000-000-000'},
  {id:'1', name: 'Ruler', ssn: '000-000-000', phone: '000-000-000'},
  {id:'2', name: 'Alex', ssn: '000-000-000', phone: '000-000-000'},
  {id:'3', name: 'Robert', ssn: '000-000-000', phone: '000-000-000'},
  {id:'4', name: 'Aaron', ssn: '000-000-000', phone: '000-000-000'},
  {id:'5', name: 'Jack', ssn: '000-000-000', phone: '000-000-000'}]);

  const [formData, setFormData] = useState({
    email: '',
    name: ''
  });

  useLayoutEffect(() => {

    async function fetchData() {

      try {
        const result = await fetchTokens();
        console.log(result);
        setEmployees(result);
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
        setEmployees(result);
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
      link:"http://localhost:3000/registration/1",
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



  return (
    <div>
      <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="name"  value={formData.name} id="name" onChange={handleChange}  />
      <label  htmlFor="user_email">Email</label>
      <input type="email" name="email" value={formData.email} id="email" onChange={handleChange} />
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
            {employees.map((employee => (
              <tr key={employee.id}>
                <th>{employee.name}</th>
                <th >{employee.email}</th>
                <th>{employee.link}</th>
                <th>{employee.status}</th>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
    </div>
  )
}




