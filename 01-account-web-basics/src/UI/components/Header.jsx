import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../shared/auth-context";

const Header = (props) => {
  const authCtx = useContext(AuthContext);

  const onLogoutHandler = () => {
    authCtx.logout();
  }

  return (
    <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <NavLink className="nav-link" to="/home">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/accounts">
            Accounts
          </NavLink>
        </li>
        <li className="nav-item">
        {authCtx.isLoggedIn? 
          (<NavLink className="nav-link" to="/login" onClick= {onLogoutHandler}>
            Logout
          </NavLink>) : (<NavLink className="nav-link" to="/login">
            Login
          </NavLink>)}
        </li>
      </ul>
    </nav>
  );
};

export default Header;
