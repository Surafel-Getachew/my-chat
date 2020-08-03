import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/auth/Header";
import Signup from "./components/auth/Signup";
import SignIn from "./components/auth/SignIn";
import GroupNames from "./components/GroupNames";
import Messages from "./components/Messages";
import ChatState from "./context/chat/ChatState";
import Dashboard from "./components/Dashboard";
import Landing from "./components/Landing";
import Room from "./components/Room";
import Facebook from "./components/auth/Facebook";
import AuthState from "./context/authentication/AuthState";
import ChatPage from "./private_chat/ChatPage";


import setAuthToken from "./utils/setAuthToken";
if (localStorage.token) {
  setAuthToken(localStorage.token)
}

// import RoomItem from "./components/RoomItem";

// 399788636327-5v1491na1eaj69ou453v0r7bm8tp2ajt.apps.googleusercontent.com ========= client id
// PnOy1u0863ltxxJEhgPO9Lva ======== client secret.

const App = () => {
  return (
    <AuthState>
      <ChatState>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/header" component={Header} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/dash" component={Dashboard} />
            <Route exact path="/room" component={GroupNames} />
            <Route exact path="/rooms" component={Room} />
            <Route exact path="/auth" component={Facebook} />
            <Route exact path="/message" component={Messages} />
            <Route exact path="/privatechat" component={ChatPage} />
          </Switch>
        </Router>
      </ChatState>
    </AuthState>
  );
};

export default App;
