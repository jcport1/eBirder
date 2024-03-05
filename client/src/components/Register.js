import "../styles/LoginRegistration.css" 
import React, { useState } from 'react'
import {checkStatus, handleError, processResponse} from "../libs/jsonparser"
import {useNavigate} from "react-router-dom"

function Register(props) {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [confirmedPassword, setConfirmedPassword] = useState(''); 
  const [registerEnabled, setRegisterEnabled] = useState(false); 
  const [passwordsMatch, setPasswordsMatch] = useState(true); 
  const [emailTaken, setEmailTaken] = useState(false); 

  let navigate = useNavigate();

  const verifyAndAddNewUser = async (res, eml, pw, fn, ln, un) => {
    if(res) {
      setEmailTaken(true);
      return false;
    } else {
      let data = { 'user': {
          'email': eml,
          'password': pw,
          'firstName': fn,
          'lastName': ln, 
          'username': un,
      }}; 

      data = JSON.stringify(data); 
      const reqOptions = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: data
      }

      const raw = await fetch('http://localhost:3001/api/user/post', reqOptions); 
      const final = await raw.json(); 
      return true; 
    }
  } 

  // Function to handle login info submit
  const handleSubmit = async e => {
    e.preventDefault(); 
    let email = e.target.eml.value; 
    let password = e.target.pw.value; 
    let confirmedPassword = e.target.cpw.value; 
    let firstName = e.target.fn.value;
    let lastName = e.target.ln.value; 
    let username = e.target.un.value; 

    if(password !== confirmedPassword) {
      setPasswordsMatch(false);
      return; 
    }

    let sucess = await fetch(`http://localhost:3001/api/user/exists/${email}`)
      .then(checkStatus)
      .then(response => response.json())
      .then(processResponse)
      .then(async res => await verifyAndAddNewUser(res, email, password, firstName, lastName, username))
      .catch(handleError); 
    
    if(sucess) {
      navigate('/login'); 
    }
  }

  const handleEmailChange = e => {
    let unTemp = e.target.value; 
    setEmail(unTemp); 

    if(unTemp === '' || password === '' || confirmedPassword === '') {
      setRegisterEnabled(false);
    } else {
      setRegisterEnabled(true); 
    }
  }

  const handlePasswordChange = e => {
    let pwTemp = e.target.value; 
    setPassword(pwTemp); 

    if(email === '' || pwTemp === '' || confirmedPassword === '') {
      setRegisterEnabled(false);
    } else {
      setRegisterEnabled(true);
    }
  }

  const handleConfirmedPasswordChange = e => {
    let cpwTemp = e.target.value; 
    setConfirmedPassword(cpwTemp); 

    if(email === '' || password === '' || cpwTemp === '') {
      setRegisterEnabled(false);
    } else {
      setRegisterEnabled(true); 
    }
  }

  return (
    <div className="center-wrapper">
      <div>
        <h1>Register</h1>
        <hr/>
        <form onSubmit={e => handleSubmit(e)}>
          <label>
            <p>First Name:</p>
            <input type="text" name="fn"/>
          </label>
          <label>
            <p>Last Name:</p>
            <input type="text" name="ln" />
          </label>
          <label>
            <p>Username:</p>
            <input type="text" name="un"/>
          </label>
          <label>
            <p>Email:</p>
            <input onChange={e => handleEmailChange(e)} type="text" name="eml"/>
          </label>
          <label>
            <p>Password:</p>
            <input onChange={e => handlePasswordChange(e)} type="password" name="pw"/>
          </label>
          <label>
            <p>Confirm Password:</p>
            <input onChange={e => handleConfirmedPasswordChange(e)} type="password" name="cpw"/>
          </label>
            <p></p>
            <button disabled={!registerEnabled} type="submit">Register</button>
        </form>
        <p style={{visibility: !passwordsMatch ? 'visible' : 'hidden', color:"red"}}>Passwords don't match.</p>
        <p style={{visibility: emailTaken? 'visible' : 'hidden', color:"red"}} >Email already taken.</p>
      </div>
    </div>
  ); 
}

export default Register; 