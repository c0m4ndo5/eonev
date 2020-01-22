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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

const App: React.FC = () => {
  //The root app simply builds a header with links to the home page and about page
  return (
    <div className="App">
      <Router>
        <Navbar bg="info" variant="dark">
          <Link to="/eventviewer">
            <Navbar.Brand>
              <FontAwesomeIcon icon={faHome}></FontAwesomeIcon> EONEV
            </Navbar.Brand>
          </Link>
          <Navbar.Collapse className="justify-content-end">
            <Link to="/about">
              <Navbar.Text>
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  size="lg"
                ></FontAwesomeIcon>
              </Navbar.Text>
            </Link>
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
