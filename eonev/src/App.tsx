import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Content from "./components/Content";
import { Navbar, Container } from "react-bootstrap";

const App: React.FC = () => {
  //PENDING header
  return (
    <div className="App">
      <Router>
        <Navbar bg="info" variant="dark">
          <Navbar.Brand>ICON PENDING EONEV</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>About Icon</Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        <Container className="content">
          <Switch>
            <Route path="/">
              <Redirect to="eventviewer"></Redirect>
              <Content></Content>
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
