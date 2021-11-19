import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import AccountList from "./account/components/container/AccountList";
import AddAccount from "./account/components/presentation/AddAccount";
import Home from "./Home/components/Home";
import LoginForm from "./Security/Login/Components/LoginForm";
import Header from "./UI/components/Header";

const Layout = () => {
  return (
    <div>
      <Header />
      <Suspense
        fallback={
          <h1>Please Wait! We are getting ready with your contents!</h1>
        }
      >
        <Switch>
        <Route path="/" component={LoginForm} exact />
          <Route path="/login" component={LoginForm} exact />
          <Route path="/home" component={Home} exact />
          <Route path="/accounts" component={AccountList} exact />
          <Route path="/add-account/:accId" component={AddAccount} />
        </Switch>
      </Suspense>
    </div>
  );
};

export default Layout;
