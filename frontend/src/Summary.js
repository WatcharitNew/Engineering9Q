import React, { Component } from "react";
import NavBar from "./NavBar";
import "./Summary.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import LocalStorageService from "./LocalStorageService";
import axios from "axios";
import { Redirect } from "react-router-dom";
var utilities = require("./Utilities.json");

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: LocalStorageService.getScore(),
      suggestion: "",
      userID: LocalStorageService.getUserID(),
      redirectToHome: false,
      finish: false
    };
  }

  componentDidMount = () => {
    console.log(this.state.userID);
    if (this.state.userID === "") {
      this.setState({ redirectToHome: true });
    }
  };

  getSummary = () => {
    var text = "";
    var score = this.state.score;
    const label = "นิสิตมีความเสี่ยงภาวะซึมเศร้า";
    if (score < 7) {
      text = <h4>{label} ระดับน้อยมาก</h4>;
    } else if (score < 13) {
      text = <h4>{label} ระดับน้อย</h4>;
    } else if (score < 19) {
      text = <h4>{label} ระดับปานกลาง</h4>;
    } else {
      text = <h4>{label} ระดับรุนแรง</h4>;
    }
    return text;
  };

  getSuggestion = () => {
    return (
      <div>
        <h2 className="label-topic">ข้อเสนอแนะ</h2>
        <Form.Control
          as="textarea"
          rows="3"
          onChange={e => {
            this.setState({ suggestion: e.target.value });
          }}
          className="shadow"
          value={this.state.suggestion}
        />
      </div>
    );
  };

  submit = () => {
    this.setState({ finish: true });
    axios
      .patch(utilities["backend-url"] + "/users/" + this.state.userID, {
        comment: this.state.suggestion
      })
      .then(response => {
        switch (response.status) {
          // Created
          case 201:
            console.log("already push");
            break;

          // Other case
          default:
            console.log("Status code is " + response.status);
        }
      });
    LocalStorageService.checkOut();
  };

  submitBtn = () => {
    return (
      <Row>
        <Col className="text-center mt-3">
          <Button
            type="submit"
            onClick={() => {
              this.submit();
            }}
          >
            ส่งคำตอบ
          </Button>
        </Col>
      </Row>
    );
  };

  label = () => {
    return <h2 className="label-topic">สรุปผลคะแนน</h2>;
  };

  render() {
    if (this.state.finish) {
      return (
        <div className="main-bg">
          <NavBar />
          <Container>
            <Row>
              <Col className="text-center text-light mt-5">
                <h1>ขอบคุณที่ร่วมทำแบบประเมิน</h1>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
    else if (this.state.redirectToHome) {
      return <Redirect to="/" />;
    }
    return (
      <div className="main-bg">
        <NavBar />
        <Container id="summary-box">
          <Row>
            <Col className="text-center">{this.label()}</Col>
          </Row>
          <Row>
            <Col className="text-center mt-3">{this.getSummary()}</Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col xs={3}></Col>
            <Col
              xs={6}
              className="text-center mt-3 text-white"
              id="suggestion-box"
            >
              {this.getSuggestion()}
            </Col>
            <Col xs={4}></Col>
          </Row>
          {this.submitBtn()}
        </Container>
      </div>
    );
  }
}

export default Summary;
