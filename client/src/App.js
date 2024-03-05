import React, { useReducer, useRef, useState } from "react";
import { parseCookies, writeCookie } from "./libs/cookielib";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Map from "./components/Map";
import UserContext from "./contexts/UserContext"

import { Route, Routes } from "react-router-dom";

const initialState = {
  isAuthenticated: false,
  user: {
    _id: "",
    email: "",
    firstName: "", 
    lastName: "", 
    username: "",
  }
};

const reducer = (state, action) => {
  switch(action.type) {
    case 'login':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user
      }
    case 'update':
      return {
        ...state,
        user: action.payload.user
      }
    case 'logout':
      return {
        ...state,
        isAuthenticated: false, 
        user: null,
      }
    default: 
      return state; 
  }
}

function App() {

  const [state, updateState] = useReducer(reducer, initialState); 

  // This is to create some form of login persistence.
  // const cookies = document.cookie;
  // const cookiesDict = parseCookies(cookies);
  // let loggedIn = "loggedIn" in cookiesDict ? cookiesDict["loggedIn"] : false;

 // const updateUser = (newuser) => {
 //   user.current = newuser; 
 //   console.log('user in updateUser: ' + JSON.stringify(user.current)); 
 // }

  return (
    <>
    <UserContext.Provider value={{state, updateState}}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/login" element={<Login onLogin={(u) => console.log('yo')} />} />
        <Route path="/profile" element={<Profile onUserEdited={u => console.log('yo')} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </UserContext.Provider>
    </>
  );
}

export default App;
