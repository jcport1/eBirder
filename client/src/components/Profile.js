import React, { useState, useRef } from "react"
import EditProfile from "./EditProfile"
import ViewProfile from "./ViewProfile"

export default function Profile(props) {
  const [editMode, setEditMode] = useState(false); 

  const curUser = useRef(props.user); 

  const toggleEditMode = () =>{
    setEditMode(!editMode); 
    console.log('edit mode ' + editMode); 
    console.log('user in toggleEditMode: ' + JSON.stringify(curUser.current)); 
  }

  console.log('User in profile body: ' + JSON.stringify(curUser.current))

  if(editMode) {
    return (
      <div style={{marginLeft: "5%"}}>
        <EditProfile user={curUser.current} onProfileEdit={u => props.onUserEdited(u)} onSaveButtonClicked={() => toggleEditMode()}/>
      </div>
    ); 
  } else {
    return (
      <>
      <div style={{marginLeft: "5%"}}>
        <ViewProfile user={curUser.current} onEditButtonClicked={() => toggleEditMode()}/>
      </div>
      </>
    ); 
  }
}
