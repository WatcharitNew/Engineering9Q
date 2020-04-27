import React, { Component } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Home from "./component/Home";
import Question from "./component/Question";
import Summary from "./component/Summary";
import Instruction from "./component/Instruction";
import AdminHome from "./component/AdminHome";
import AdminStudent from "./component/AdminStudent";
import axios from "axios";
import SessionStorageService from "./SessionStorageService";
var Qs = require("qs");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const requestBody = {
      q: "token",
      client_key: "a829304hjuy7yh8gh",
      client_secret: "hbu4t5nifvj9"
    };

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    await axios
      .post(
        "https://student.eng.chula.ac.th/tstudent/auth/service.php",
        Qs.stringify(requestBody),
        config
      )
      .then((response) => {
        switch (response.status) {
          // Created
          case 200:
            console.log("complete fetch token");
            SessionStorageService.setToken(response.data.token);
            break;

          // Other case
          default:
            console.log("Status code is " + response.status);
        }
      });
  }

  render() {
    return (
      <div>
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
