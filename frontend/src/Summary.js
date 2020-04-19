import React, { Component } from "react";
import "./Summary.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import LocalStorageService from "./LocalStorageService";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";
var utilities = require("./Utilities.json");

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: LocalStorageService.getScore(),
      userID: LocalStorageService.getUserID(),
      redirectToHome: false,
      finish: false,
      showDetail: [false, false, false],
      helpDetail: ["", "", ""],
      stressDetail: "",
      requestHelp: -1,
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

  detailArea = (idx) => {
    if (this.state.showDetail[idx]) {
      return (
        <Col>
          <Form.Control
            as="textarea"
            rows="1"
            placeholder="อธิบายเพิ่มเติม"
            onChange={(e) => {
              var helpDetail = this.state.helpDetail;
              helpDetail[idx] = e.target.value;
              this.setState({ helpDetail: helpDetail });
            }}
            value={this.state.helpDetail[idx]}
          />
        </Col>
      );
    }
    return;
  };

  helpAnswerDisp = () => {
    const helpList = [
      <h5>ด้านการเรียน</h5>,
      <h5>ด้านสุขภาพ</h5>,
      <h5>อื่นๆ</h5>,
    ];
    return helpList.map((help, idx) => (
      <Row className="mb-3" key={idx + 1}>
        <Col xs={3}>
          <Form.Check
            custom
            type="checkbox"
            label={help}
            id={idx + 1}
            className="mt-1 mb-1"
            onClick={(e) => {
              var showDetail = this.state.showDetail;
              showDetail[idx] = !showDetail[idx];
              this.setState({ showDetail: showDetail });
              console.log(this.state.showDetail);
            }}
          />
        </Col>
        {this.detailArea(idx)}
      </Row>
    ));
  };

  label = () => {
    return (
      <h2 className="label-topic background-orange text-light label-curve pt-2 pb-2">
        สรุปผลคะแนน
      </h2>
    );
  };

  submit = () => {
    if (this.state.requestHelp == -1) {
      Swal.fire({
        text: "โปรดเลือกความต้องการด้วย",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "โอเค",
      });
    } else {
      Swal.fire({
        title: "ต้องการส่งคำตอบ?",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "ไม่",
        confirmButtonText: "ใช่",
        showCancelButton: true,
        reverseButtons: true,
      }).then((result) => {
        if (result.value) {
          var helpStudy = this.state.showDetail[0]
            ? this.state.helpDetail[0]
            : "";
          var helpHealth = this.state.showDetail[1]
            ? this.state.helpDetail[1]
            : "";
          var helpOther = this.state.showDetail[2]
            ? this.state.helpDetail[2]
            : "";
          axios
            .patch(utilities["backend-url"] + "/users/" + this.state.userID, {
              helpStudy: helpStudy,
              helpHealth: helpHealth,
              helpOther: helpOther,
            })
            .then((response) => {
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
          this.setState({ finish: true });
        }
      });
    }
  };

  questionDisp = (quest) => {
    return (
      <h4 className="background-orange text-light label-curve pt-3 pb-3">
        {quest}
      </h4>
    );
  };

  stressAnswerDisp = () => {
    return (
      <Form.Control
        as="textarea"
        rows="2"
        onChange={(e) => {
          this.setState({ stressDetail: e.target.value });
        }}
        placeholder=""
        value={this.state.stressDetail}
        placeholder="อธิบายเพิ่มเติม"
      />
    );
  };

  requestHelpDisp = () => {
    const requestList = [<h5>ต้องการ</h5>, <h5>ไม่ต้องการ</h5>];
    return requestList.map((request, idx) => (
      <Row className="mb-3" key={idx + 1}>
        <Col xs={3}>
          <Form.Check
            custom
            type="radio"
            label={request}
            id={idx + 5}
            onClick={(e) => {
              this.setState({ requestHelp: idx });
            }}
            checked={this.state.requestHelp === idx}
          />
        </Col>
      </Row>
    ));
  };

  helpQuestion = () => {
    return (
      <Container id="summary-help-box">
        <Row>
          <Col className="text-center">
            {this.questionDisp(
              "นิสิตอยากให้ทางคณะช่วยเหลือด้านไหนบ้าง สามารถเสนอแนะได้ตามหัวข้อด้านล่าง"
            )}
          </Col>
        </Row>
        <Row>
          <Col className="ml-5 mr-5 mt-1 mb-1">
            <Form className="ml-4">
              <fieldset>
                <Form.Group>{this.helpAnswerDisp()}</Form.Group>
              </fieldset>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            {this.questionDisp("ขอให้นิสิตอธิบายความกังวลหรือความเครียดสั้นๆ")}
          </Col>
        </Row>
        <Row>
          <Col className="ml-5 mr-5 mt-2 mb-4">{this.stressAnswerDisp()}</Col>
        </Row>
        <Row>
          <Col className="text-center mt-1 mb-1">
            {this.questionDisp(
              "หากฝ่ายกิจการนิสิต จะจัดให้มีนักจิตแพทย์มาให้คำปรึกษานิสิตผ่านออนไลน์ นิสิตมีความต้องการหรือไม่"
            )}
          </Col>
        </Row>
        <Row>
          <Col className="ml-5 mr-5 mt-2">
            <Form className="ml-4">
              <fieldset>
                <Form.Group>{this.requestHelpDisp()}</Form.Group>
              </fieldset>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <Button
              size="lg"
              variant="primary"
              className="text-light"
              onClick={() => {
                this.submit();
              }}
            >
              ส่งคำตอบ
            </Button>
          </Col>
        </Row>
      </Container>
    );
  };

  contactDisp = () => {
    return (
      <Container id="summary-tel-box">
        <Row>
          <Col className="text-center">
            <h4>เบอร์สายด่วน 02 218 0540</h4>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <a href="https://wellness.chula.ac.th/">
              <h4>wellness.chula.ac.th</h4>
            </a>
          </Col>
        </Row>
      </Container>
    );
  };

  showResult = () => {
    return (
      <Container id="summary-box">
        <Row>
          <Col className="text-center">{this.label()}</Col>
        </Row>
        <Row>
          <Col className="text-center mt-3">{this.getSummary()}</Col>
        </Row>
      </Container>
    );
  };

  render() {
    if (this.state.finish) {
      return (
        <div className="main-bg">
          <Container>
            <Row>
              <Col className="text-center text-light mt-5">
                <div className="finish-text">
                  <h3>ขอบคุณที่ร่วมทำแบบประเมิน</h3>
                  <h3>แหล่งอ้างอิง : กรมสุขภาพจิต กระทรวงสาธารณสุข</h3>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      );
    } /*else if (this.state.redirectToHome) {
      return <Redirect to="/" />;
    }*/
    return (
      <div className="main-bg">
        {this.showResult()}
        {this.helpQuestion()}
        {this.contactDisp()}
      </div>
    );
  }
}

export default Summary;
