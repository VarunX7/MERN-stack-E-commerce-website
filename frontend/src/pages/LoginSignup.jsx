import React, { useState } from 'react'
import './css/LoginSignup.css'

export const LoginSignup = () => {

  const [state, setState] = useState('Log In')
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const toggleState = () =>{
    setState(state === 'Log In' ? 'Sign Up' : 'Log In')
  }

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const login = async() =>{
    let responseData
    
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers:{
        Accept: 'application/form-data',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then((res)=>res.json()).then((data)=>responseData = data)
    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token)
      window.location.replace("/")
    }
    else{
      alert(responseData.error)
    }
  }

  const signup = async() =>{
    let responseData

    await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers:{
        Accept: 'application/form-data',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then((res)=>res.json()).then((data)=>responseData = data)

    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token)
      window.location.replace("/")
    }
    else{
      alert(responseData.error)
    }
  }

  return (
    <div className='loginSignup'>
      <div className="loginSignup-container">
        <h1>{state}</h1>
        <div className="loginSignup-fields">
          {state==='Sign Up'? <input type="text" name='name' placeholder='Your Name' value={formData.name} onChange={handleChange}/> : <></>}
          <input type="email" name='email' placeholder='e-mail address'  value={formData.email} onChange={handleChange} />
          <input type="password" name='password' placeholder='Password' value={formData.password} onChange={handleChange}/>
        </div>
        <button onClick={()=>{state==='Log In'? login(): signup()}}>Continue</button>
        <p className='loginSignup-login'>{state === 'Log In'? "Don't have an account?": 'Already have an account?'} <span onClick={toggleState}>{state === 'Log In' ? 'Sign Up' : 'Log In'} here</span></p>
        <div className="loginSignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By contiuing I agree to the terms of use and privacy policy</p>
        </div>
      </div>
    </div>
  )
}
