import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Content from "./components/Content";

const App: React.FC = () => {
  //PENDING header
  return (
    <div className="App">
      <div className="content alert alert-primary">
        <Router>
          <Switch>
            <Route path="/">
              <Content></Content>
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
};

export default App;
