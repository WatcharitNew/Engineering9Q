import React, { Component } from "react";
import NavBar from "./NavBar";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <div className="main-bg">
        <NavBar />
        <Container id="AdminHome-box">
          <Row>
            <Col className="text-center">
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default AdminHome;
