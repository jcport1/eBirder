import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";

export default function Navbar() {
  const { state } = useContext(UserContext);

  return (
    <nav className="nav-bar">
      <Link to="/" className="site-title">
        Ebirder
      </Link>
      <ul>
        {state.isAuthenticated ? (
          <>
            <li>{state.user.email}</li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/">Logout</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
