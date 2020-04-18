import React, { Component } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";
import Question from "./Question";
import Summary from "./Summary";
import Instruction from "./Instruction";
import AdminHome from "./AdminHome";
import NavBar from "./NavBar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <NavBar />
        <Router>
          <Switch>
            <Route exact path="/" component={() => <Instruction />} />
            <Route path="/question" component={() => <Question />} />
            <Route path="/summary" component={() => <Summary />} />
            <Route path="/admin/home" component={() => <AdminHome />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
