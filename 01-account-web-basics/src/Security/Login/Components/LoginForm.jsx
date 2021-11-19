import React, { useState, useContext } from "react";
import classes from "./LoginForm.module.css";
import AuthContext from "../../../shared/auth-context";
import Button from "../../../UI/components/Button";
const LoginForm = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useContext(AuthContext);

  const onLoginHandler = (e) => {
    e.preventDefault();
    authContext.login(userName, password);
    props.history.push("/home");
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={onLoginHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            required
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" />
        </div>
      </form>
    </section>
  );
};

export default LoginForm;
