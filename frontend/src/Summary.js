import React, { Component } from "react";
import NavBar from "./NavBar";
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
      answerHelp: "",
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
            onChange={(e) => {
              this.setState({ answerHelp: e.target.value });
            }}
            className="shadow"
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

  questionDisp = () => {
    return (
      <h4>
        นิสิตอยากให้ทางคณะช่วยเหลือด้านไหนบ้าง สามารถเสนอแนะได้ตามหัวข้อด้านล่าง
      </h4>
    );
  };

  answerDisp = () => {
    const helpList = [
      <h4>ด้านการเรียน</h4>,
      <h4>ด้านสุขภาพ</h4>,
      <h4>อื่นๆ</h4>,
    ];
    return helpList.map((help, idx) => (
      <Row className="mb-3" key={idx+1}>
        <Col xs={3}>
          <Form.Check
            custom
            type="checkbox"
            label={help}
            id={idx + 1}
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
    return <h2 className="label-topic">สรุปผลคะแนน</h2>;
  };

  submit = () => {
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
          this.setState({finish: true});
      }
    });
  };

  render() {
    if (this.state.finish) {
      return (
        <div className="main-bg">
          <NavBar />
          <Container>
            <Row>
              <Col className="text-center text-light mt-5">
                <div className="finish-text">
                  <h3>ขอบคุณที่ร่วมทำแบบประเมิน</h3>
                  <h3>แหล่งอ้างอิง:กรมสุขภาพจิต กระทรวงสาธารณสุข</h3>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      );
    } else if (this.state.redirectToHome) {
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
        <Container id="summary-help-box">
            <Row>
              <Col className="text-center ml-4 mt-3 mb-3">{this.questionDisp()}</Col>
            </Row>
            <Row>
              <Col>
                <Form className="ml-4">
                  <fieldset>
                    <Form.Group>{this.answerDisp()}</Form.Group>
                  </fieldset>
                  <div className="text-center">
                  <Button
                    id="begin-button"
                    onClick={() => {
                      this.submit();
                    }}
                  >
                    ส่งคำตอบ
                  </Button>
                  </div>
                </Form>
              </Col>
            </Row>
        </Container>
        <Container id="summary-tel-box">
          <Row>
            <Col className="text-center"><h4>เบอร์สายด่วน 02 218 0540</h4></Col>
          </Row>
          <Row>
            <Col className="text-center"><a href="https://wellness.chula.ac.th/"><h4>wellness.chula.ac.th</h4></a></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Summary;
