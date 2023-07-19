import React,  { useState }  from 'react';
import './styles/signin.css';

export default function SignIn() {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = ()=>{

  }

  const handleChange = ()=>{

  }

  return (
    <div className="auth-form-container">
      <h2>Sign In to your account</h2>
      <span className="deletebutton"></span>
      <form className="login-form" onSubmit = {handleSubmit}>
        <label htmlFor="email">Email</label>
        <input  placeholder="youremail@gmail.com" id="email" name="email"  value = {formData.email} onChange={handleChange}/>
        <label htmlFor="password">Password</label>
        <input type="password" placeholder="********" id="password" name="password" value = {formData.password} onChange={handleChange}/>
        <button type="submit" className='submitButton' onSubmit = {handleSubmit}>Sign In  </button>
      </form>

      <div className='formAgreement'>
        Don't have an account? 
        <a href="/SignUp" style={{color:"blue"}}> SignUp </a>
        
      </div>

      <a href="/updatePassword" className='updatePassword'> Frogot Password </a>
    </div>  
  )
}


