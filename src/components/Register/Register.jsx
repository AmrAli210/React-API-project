import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function Register() {

  let [user,setUser]=useState({
    first_name:'',
    last_name:'',
    age:'',
    email:'',
    password:'',
  });

  let [errorMsg,setErrorMsg]=useState('');
  let [errorsList,setErrorsList]=useState([]);
  let [loading,setLoading]=useState(false)

  const navigate=useNavigate();
  function goToLogin()
{
  navigate('/login')
}


async function submitFormDate(e)
  {
    e.preventDefault();
    setLoading(true);
   let validateResponse = validateForm();
   if(validateResponse.error)
   {
    setErrorsList(validateResponse.error.details)
   }
   else{
    let {data} = await axios.post('https://route-movies-api.vercel.app/signup ',user);
    if(data.message == 'success')
    {
      goToLogin();
    }
    else{
      setErrorMsg('This email already registered')
    }
   }
   setLoading(false);
  }


  function validateForm()
  {
    const schema = Joi.object({
      first_name:Joi.string().alphanum().required().min(3).max(15),
      last_name:Joi.string().alphanum().required().min(3).max(15),
      age:Joi.number().required().min(20).max(80),
      email:Joi.string().required().email({tlds:{allow:['net','com']}}),
      password:Joi.string().required(),
    })
    return schema.validate(user,{abortEarly:false})
  }

  function getFormValue(e)
  { let myUser={...user};
    myUser[e.target.name]=e.target.value;
    setUser(myUser)
  }

  return (
    <>
    <div className="my-4 m-auto w-75">
      <h1>Register form</h1>
      {errorsList.map((error,index)=><div key={index} className='alert alert-danger'>{error.message}</div>)}
      {errorMsg?<div className='alert alert-danger'>{errorMsg}</div>:''}
      <form  onSubmit={submitFormDate}>
        <div className="input-gp my-2">
          <label htmlFor="first_name">First name:</label>
          <input  onChange={getFormValue} type="text" className='form-control' name='first_name' />
        </div>
        <div className="input-gp my-2">
          <label htmlFor="last_name">Last name:</label>
          <input  onChange={getFormValue} type="text" className='form-control' name='last_name' />
        </div>
        <div className="input-gp my-2">
          <label htmlFor="age">Age:</label>
          <input  onChange={getFormValue} type="number" className='form-control' name='age' />
        </div>
        <div className="input-gp my-2">
          <label htmlFor="email">Email:</label>
          <input  onChange={getFormValue} type="email" className='form-control' name='email' />
        </div>
        <div className="input-gp my-2">
          <label htmlFor="password">Password:</label>
          <input  onChange={getFormValue} type="password" className='form-control' name='password' />
        </div>
        <button className='btn btn-info float-end' type='submit'>
          {loading?<i className='fa fa-spinner fa-spin' ></i>:'Register'}
        </button>
        
        <div className="clear-fix"></div>
      </form>

    </div>


    
    
    </>
  )
}
