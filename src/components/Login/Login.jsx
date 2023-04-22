import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
  let [user,setUser]=useState({
  
    email:'',
    password:'',
  });

  let [errorMsg,setErrorMsg]=useState('');
  let [errorsList,setErrorsList]=useState([]);
  let [loading,setLoading]=useState(false)

  const navigate=useNavigate();
  function goToHome()
{
  navigate('/home')
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
    let {data} = await axios.post('https://route-movies-api.vercel.app/signin ',user);
    if(data.message == 'success')
    {
      localStorage.setItem('userToken',data.token);
      props.saveUserData();
      goToHome();
    }
    else{
      setErrorMsg(data.message)
    }
   }
   setLoading(false);
  }


  function validateForm()
  {
    const schema = Joi.object({
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
      <h1>Login form</h1>
      {errorsList.map((error,index)=><div key={index} className='alert alert-danger'>{error.message}</div>)}
      {errorMsg?<div className='alert alert-danger'>{errorMsg}</div>:''}
      
      <form  onSubmit={submitFormDate}>
        <div className="input-gp my-2">
          <label htmlFor="email">Email:</label>
          <input  onChange={getFormValue} type="email" className='form-control' name='email' />
        </div>
        <div className="input-gp my-2">
          <label htmlFor="password">Password:</label>
          <input  onChange={getFormValue} type="password" className='form-control' name='password' />
        </div>
        <button className='btn btn-info float-end' type='submit'>
          {loading?<i className='fa fa-spinner fa-spin' ></i>:'Login'}
        </button>
        <div className="clear-fix"></div>
      </form>

    </div>


    
    
    </>
  )
}
