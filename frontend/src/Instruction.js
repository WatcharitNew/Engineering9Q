import React, { Component } from "react";
import "./Instruction.css";
import NavBar from "./NavBar";
import { Container, Row, Col, Button } from "react-bootstrap";

class Instruction extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="main-bg">
        <NavBar />
        <Container id="instruction-box">
          <Row>
            <Col className="text-center">
              <h1>คำแนะนำ</h1>
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              <Button
                type="submit"
                href="/question"
              >
                ยอมรับ
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Instruction;
