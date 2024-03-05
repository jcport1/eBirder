import React, { useRef, useState, useContext } from "react"
import { checkStatus, processResponse, handleError } from "../libs/jsonparser";
import UserContext from "../contexts/UserContext";

export default function EditProfile(props) {
  const [emailTaken, setEmailTaken] = useState(false); 
  const [emailChanged, setEmailChanged] = useState(false); 

  const {state, updateState} = useContext(UserContext)

  const verifyAndUpdate = async (res, eml, fn, ln, un) => {
    if(res && emailChanged) {
      setEmailTaken(true);
      return false;
    } else {
      const id = state.user._id; 
      const data = { 'user': {
        '_id': id,
        'email': eml,
        'firstName': fn,
        'lastName': ln, 
        'username': un,
      }}; 

      const postData = JSON.stringify(data); 
      const reqOptions = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: postData
      }

      const raw = await fetch('http://localhost:3001/api/user/update', reqOptions); 
      const final = await raw.json(); 
      console.log(JSON.stringify(final)); 
      return true; 
    }
  } 

  const handleSubmit = async e => {
    e.preventDefault();
    // Check for verification
    const firstName = e.target.fn.value ? e.target.fn.value : state.user.firstName; 
    const lastName = e.target.ln.value ? e.target.ln.value : state.user.lastName; 
    const username = e.target.un.value ? e.target.un.value : state.user.username;
    const email = e.target.eml.value ? e.target.eml.value : state.user.email; 

    let success = await fetch(`http://localhost:3001/api/user/exists/${email}`)
      .then(checkStatus)
      .then(response => response.json())
      .then(processResponse)
      .then(async res => await verifyAndUpdate(res, email, firstName, lastName, username))
      .catch(handleError);


    if(success) {
      let newUser = {
        _id: state.user._id,
        email: email,
        firstName: firstName, 
        lastName: lastName, 
        username: username,
      }

      const newPayload = {
        isAuthenticated: true, 
        user: newUser
      }
      updateState({
        type: 'login', 
        payload: newPayload
      });
      props.onSaveButtonClicked(); 
    }
    

    // call updateUser 
    // call api
    //    Verify email not taken
    //    PUT call to server
  }

  const handleEmailChanged = () => setEmailChanged(true);

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label style={{display: "block"}}>
          <h2 style={{display: 'inline-block'}}>First Name: </h2>
          <input type="text" name="fn" placeholder={state.user.firstName}/>
        </label>
        <label style={{display: "block"}}>
          <h2 style={{display: 'inline-block'}}>Last Name:</h2>
          <input type="text" name="ln" placeholder={state.user.lastName} />
        </label>
        <label style={{display: "block"}}>
          <h2 style={{display: 'inline-block'}}>Username:</h2>
          <input type="text" name="un" placeholder={state.user.username}/>
        </label>
        <label>
          <h2 style={{display: 'inline-block'}}>Email:</h2>
          <input type="text" onChange={() => handleEmailChanged()} name="eml" placeholder={state.user.email}/>
        </label>
          <p></p>
          <button type="submit">Save</button>
      </form>
        <p style={{visibility: emailTaken? 'visible' : 'hidden', color:"red"}} >Email already taken.</p>
    </div>
  );
}