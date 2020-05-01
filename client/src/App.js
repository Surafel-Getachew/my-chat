import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import GroupNames from "./components/GroupNames";
import Messages from "./components/Messages";
import ChatState from "./context/chat/ChatState";
import Dashboard from "./components/Dashboard";
import Landing from "./components/Landing";
import Room from "./components/Room";
import Facebook from "./components/auth/Facebook";
// import RoomItem from "./components/RoomItem";

// 399788636327-5v1491na1eaj69ou453v0r7bm8tp2ajt.apps.googleusercontent.com ========= client id
// PnOy1u0863ltxxJEhgPO9Lva ======== client secret.

const App = () => {
  return (
    <ChatState>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/dash" component={Dashboard} />
          <Route exact path="/room" component={GroupNames} />
          <Route exact path = "/rooms" component = {Room} />
          <Route exact path = "/auth" component = {Facebook} />
          <Route exact path="/message" component={Messages} />
        </Switch>
      </Router>
    </ChatState>
  );
};

export default App;
