import React from "react";
import { Route, Switch } from "react-router-dom";
import EventViewer from "./EventViewer/EventViewer";
import About from "./About/About";

const Content: React.FC = () => {
  return (
    <Switch>
      <Route path="/eventviewer">
        <EventViewer></EventViewer>
      </Route>
      <Route path="/about">
        <About></About>
      </Route>
    </Switch>
  );
};

export default Content;
