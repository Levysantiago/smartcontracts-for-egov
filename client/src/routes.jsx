import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Controll from "./pages/Controll";
import Home from "./pages/Home";
import Student from "./pages/Student";

const Routes = (
  <Router>
    <Route path="/" exact strict component={Home} />
    <Route path="/collegiate" exact strict component={Controll} />
    <Route path="/student" exact strict component={Student} />
  </Router>
);

export default Routes;
