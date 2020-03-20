import React, { Component } from "react";
import "./NavBar.css";
import logo from "./material/EngineeringLogo.png";
import { Navbar} from "react-bootstrap";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {  
    };
  }

  render() {
    var logoBrand = <img src={logo} alt="logo" id="logo" />;
    return (
      <Navbar expand="lg" id="navbar" sticky="top" className="shadow">
        <Navbar.Brand>{logoBrand}</Navbar.Brand>
      </Navbar>
    );
  }
}

export default NavBar;
