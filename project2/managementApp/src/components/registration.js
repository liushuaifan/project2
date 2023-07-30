import React,{useState} from 'react';
import './styles/signin.css';
import { useSelector, useDispatch} from 'react-redux';
import { useNavigate,useParams, } from 'react-router-dom';
import {createEmployeeAction} from '../app/employeeSlice'


export default function Registration() {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName:'',
    lastName:''
  });

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(token);
    if(token==='1') dispatch(createEmployeeAction(formData)).then(() => navigate('/signin'));


  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="auth-form-container">
      <h2>Sign Up an account</h2>
      <span className="deletebutton"></span>


      <form className="login-form" onSubmit = {handleSubmit} >
        <label htmlFor="email">Email</label>
        <input  placeholder="youremail@gmail.com" id="email" name="email" value = {formData.email} onChange={handleChange}/>
        <label htmlFor="password">Password</label>
        <input type="password" placeholder="********" id="password" name="password" value = {formData.password} onChange={handleChange}/>
        <label htmlFor="firstName">firstName</label>
        <input   id="firstName" name="firstName" value = {formData.firstName} onChange={handleChange}/>
        <label htmlFor="lastName">lastName</label>
        <input   id="lastName" name="lastName" value = {formData.lastName} onChange={handleChange}/>
        <button type="submit" className='submitButton' onSubmit = {handleSubmit}>Create account  </button>
      </form>


      <div className='formAgreement'>
        Already Have an account?
        <a href="/SignIn" style={{color:"blue"}}> SignIn </a>
        
      </div>


    </div>  
  )
}


