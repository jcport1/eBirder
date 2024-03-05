import React, {useContext} from "react"
import UserContext from "../contexts/UserContext";

export default function ViewProfile(props) {
  const {state, updateState} = useContext(UserContext); 

  return (
    <div>
      <h2>Name: {state.user.firstName} {state.user.lastName}</h2>
      <h2>Email: {state.user.email}</h2>
      <h2>Username: {state.user.username}</h2>
      <button onClick={props.onEditButtonClicked}>Edit</button>
    </div>
  );
}