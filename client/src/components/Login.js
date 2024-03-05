import "../styles/LoginRegistration.css" 
import {writeCookie} from "../libs/cookielib"
import React, { useContext, useState } from 'react'
import {checkStatus, handleError, processResponse} from "../libs/jsonparser"
import {json, useNavigate} from "react-router-dom"
import UserContext from "../contexts/UserContext"

function Login(props) {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [loginEnabled, setLoginEnabled] = useState(false); 
  const [invalidUnPw, setInvalidUnPw] = useState(false); 
  const {updateState} = useContext(UserContext); 

  let navigate = useNavigate();

  // Function to handle login info submit
  const handleSubmit = async e => {
    e.preventDefault(); 
    let email = e.target.eml.value; 
    let password = e.target.pw.value; 

    let response = await fetch(`http://localhost:3001/api/user/getOne/${email}/${password}`)
      .then(checkStatus)
      .then(response => response.json())
      .then(processResponse)
      .catch(handleError); 

    if(response) {
      writeCookie("loggedIn", true, 30); 
      var res = JSON.parse(response);
      
      let newUser = {
        _id: res._id,
        email: res.email,
        firstName: res.firstName, 
        lastName: res.lastName, 
        username: res.username,
      }

      const newPayload = {
        isAuthenticated: true, 
        user: newUser
      }

      updateState({
        type: 'login', 
        payload: newPayload
      });

      navigate("/"); 
    } else {
      writeCookie("loggedIn", false, 30);
      setInvalidUnPw(true); 
    }
  }

  const handleEmailChange = e => {
    setEmail(e.target.value); 

    if(email === '' && password === '') {
      setLoginEnabled(false);
    } else {
      setLoginEnabled(true); 
    }
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value); 

    if(email === '' && password === '') {
      setLoginEnabled(false);
    } else {
      setLoginEnabled(true); 
    }
  }

  return (
    <div className="center-wrapper">
      <div>
        <h1>Login</h1>
        <hr/>
        <form onSubmit={e => handleSubmit(e)}>
          <label>
            <p>Email:</p>
            <input onChange={e => handleEmailChange(e)} type="text" name="eml"/>
          </label>
          <label>
            <p>Password:</p>
            <input onChange={e => handlePasswordChange(e)} type="password" name="pw"/>
          </label>
            <p></p>
            <button disabled={!loginEnabled} type="submit">Login</button>
        </form>
        <p style={{visibility: invalidUnPw ? 'visible' : 'hidden', color:"red"}}>Invalid username or password</p>
      </div>
    </div>
  ); 
}

export default Login; 