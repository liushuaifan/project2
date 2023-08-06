import React,{useState, useLayoutEffect} from 'react';
import './styles/signin.css';
import { useSelector, useDispatch} from 'react-redux';
import { useNavigate,useParams, } from 'react-router-dom';
import {createEmployeeAction} from '../app/employeeSlice';
import {createToken, fetchTokens} from '../services/token'


export default function Registration() {
  let { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName:'',
    lastName:'',
    address:'',
    birthday:'',
    emergency:'',
    gender:'',
    ssn:'',
    visaTitle:''
  });

  const [existtoken, setexisttoken] =  useState([])

  useLayoutEffect(() => {

    async function fetchData() {

      try {
        const result = await fetchTokens();
        console.log(result);
        setexisttoken(result);
      } catch (error) {
        console.error("Error fetching user cart: ", error);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = (e)=>{
    e.preventDefault();
    token = "http://localhost:3000/registration/" + token;
    // console.log(token);
    // console.log(existtoken);

    for(let i of existtoken){
        console.log(i.link + "   " + token);
        if(i.link===token){
          console.log("hello")
            dispatch(createEmployeeAction(formData)).then(() => navigate('/signin'));
            return;
        }

    }
    
    alert("token not exist")


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


