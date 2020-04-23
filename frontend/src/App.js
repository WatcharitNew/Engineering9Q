import React, { Component } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Home from "./component/Home";
import Question from "./component/Question";
import Summary from "./component/Summary";
import Instruction from "./component/Instruction";
import AdminHome from "./component/AdminHome";
import NavBar from "./component/NavBar";
import AdminStudent from "./component/AdminStudent";

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
            <Route exact path="/" component={() => <Home />} />
            <Route path="/instruction" component={() => <Instruction />} />
            <Route path="/question" component={() => <Question />} />
            <Route path="/summary" component={() => <Summary />} />
            <Route path="/admin/home" component={() => <AdminHome />} />
            <Route path="/admin/student" component={() => <AdminStudent />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
