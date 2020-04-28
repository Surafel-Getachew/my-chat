import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import GroupNames from "./components/GroupNames";
import Messages from "./components/Messages";
import ChatState from "./context/ChatState";
import Dashboard from "./components/Dashboard";
import Landing from "./components/Landing";

const App = () => {
  return (
    <ChatState>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/dash" component={Dashboard} />
          <Route exact path="/rooms" component={GroupNames} />
          <Route exact path="/message" component={Messages} />
        </Switch>
      </Router>
    </ChatState>
  );
};

export default App;
