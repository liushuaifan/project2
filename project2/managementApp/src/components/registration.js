import React,{useState} from 'react';
import './styles/signin.css';

export default function Registration() {
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
      <h2>Sign Up an account</h2>
      <span className="deletebutton"></span>


      <form className="login-form" onSubmit = {handleSubmit} >
        <label htmlFor="email">Email</label>
        <input  placeholder="youremail@gmail.com" id="email" name="email" value = {formData.email} onChange={handleChange}/>
        <label htmlFor="password">Password</label>
        <input type="password" placeholder="********" id="password" name="password" value = {formData.password} onChange={handleChange}/>
        <button type="submit" className='submitButton' onSubmit = {handleSubmit}>Create account  </button>
      </form>


      <div className='formAgreement'>
        Already Have an account?
        <a href="/SignIn" style={{color:"blue"}}> SignIn </a>
        
      </div>


    </div>  
  )
}


