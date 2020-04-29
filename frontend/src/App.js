import React, { Component } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Home from "./component/Home";
import Question from "./component/Question";
import Summary from "./component/Summary";
import Instruction from "./component/Instruction";
import AdminHome from "./component/AdminHome";
import AdminStudent from "./component/AdminStudent";
import Login from "./component/Login";
import AdminRoute from "./utilities/AdminRoute"
import StudentRoute from "./utilities/StudentRoute";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <StudentRoute path="/instruction" component={() => <Instruction />} />
            <StudentRoute path="/question" component={() => <Question />} />
            <StudentRoute path="/summary" component={() => <Summary />} />
            <Route exact path="/login" component={() => <Login />} />
            <AdminRoute path="/admin/home" component={() => <AdminHome />} />
            <AdminRoute path="/admin/student" component={() => <AdminStudent />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
