import React, { Component } from "react";
import "./Summary.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import SessionStorageService from "../SessionStorageService";
import axios from "axios";
import Swal from "sweetalert2";
import LoadSpinner from "./LoadSpinner";
var Qs = require("qs");
var CryptoJS = require("crypto-js");

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: SessionStorageService.getScore(),
      userID: SessionStorageService.getUserID(),
      redirectToHome: false,
      finish:
        SessionStorageService.getFinish() === ""
          ? "false"
          : SessionStorageService.getFinish(),
      showDetail: [false, false, false],
      helpDetail: ["", "", ""],
      stressDetail: "",
      requestHelp: -1,
      setLoading: false,
    };
  }

  componentDidMount = () => {
    if (this.state.userID === "") {
      this.setState({ redirectToHome: true });
    }
  };

  getSummary = () => {
    var text = "";
    var score = this.state.score;
    const label = "นิสิตมีความเสี่ยงภาวะซึมเศร้า";
    if (score < 7) {
      text = (
        <h4>
          {label} <br />
          ระดับน้อยมาก
        </h4>
      );
    } else if (score < 13) {
      text = (
        <h4>
          {label} <br />
          ระดับน้อย
        </h4>
      );
    } else if (score < 19) {
      text = (
        <h4>
          {label} <br />
          ระดับปานกลาง
        </h4>
      );
    } else {
      text = (
        <h4>
          {label} <br />
          ระดับรุนแรง
        </h4>
      );
    }
    return text;
  };

  detailHandler = (detail) => {
    const regEx = /^[ก-์a-zA-Z0-9\s]*$/;
    return regEx.test(detail);
  };

  detailArea = (idx) => {
    if (this.state.showDetail[idx]) {
      return (
        <Col xs={12}>
          <Form.Control
            as="textarea"
            rows="1"
            placeholder="อธิบายเพิ่มเติม"
            onChange={(e) => {
              if (this.detailHandler(e.target.value)) {
                var helpDetail = this.state.helpDetail;
                helpDetail[idx] = e.target.value;
                this.setState({ helpDetail: helpDetail });
              }
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
        <Col xs={12}>
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
    if (this.state.requestHelp === -1) {
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
          this.setState({ setLoading: true });
          var helpStudy = this.state.showDetail[0]
            ? this.state.helpDetail[0]
            : "";
          var helpHealth = this.state.showDetail[1]
            ? this.state.helpDetail[1]
            : "";
          var helpOther = this.state.showDetail[2]
            ? this.state.helpDetail[2]
            : "";

          var idBytes = CryptoJS.AES.decrypt(this.state.userID, "id");
          var idText = idBytes.toString(CryptoJS.enc.Utf8);
          const requestBody = {
            q: "addComment",
            userId: idText,
            helpStudy: helpStudy,
            helpHealth: helpHealth,
            helpOther: helpOther,
            worryText: this.state.stressDetail,
            isWantPsychologist: this.state.requestHelp === 0 ? 1 : 0,
          };

          const config = {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          };

          axios
            .post(
              process.env.REACT_APP_BACKEND_URL,
              Qs.stringify(requestBody),
              config
            )
            .then((response) => {
              switch (response.status) {
                // Created
                case 200:
                  console.log("already push");
                  SessionStorageService.setFinish("true");
                  this.setState({ finish: "true" });
                  break;

                // Other case
                default:
                  console.log("Status code is " + response.status);
              }
            });
        }
      });
    }
  };

  questionDisp = (quest) => {
    return (
      <h4 className="background-orange text-light label-curve pt-3 pb-3 text-center">
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
          if (this.detailHandler(e.target.value)) {
            this.setState({ stressDetail: e.target.value });
          } else {
            Swal.fire({
              html: "กรุณาพิมพ์ภาษาไทย ภาษาอังกฤษ ตัวเลข และเว้นวรรคเท่านั้น",
              icon: "info",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "ตกลง",
            });
          }
        }}
        value={this.state.stressDetail}
        placeholder="อธิบายเพิ่มเติม"
      />
    );
  };

  requestHelpDisp = () => {
    const requestList = [<h5>ต้องการ</h5>, <h5>ไม่ต้องการ</h5>];
    return requestList.map((request, idx) => (
      <Row className="mb-3" key={idx + 1}>
        <Col>
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
            {this.questionDisp("ขอให้นิสิตอธิบายความกังวลหรือความเครียดสั้นๆ")}
          </Col>
        </Row>
        <Row>
          <Col className="ml-4 mr-4 mt-2 mb-4">{this.stressAnswerDisp()}</Col>
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
            <Form className="ml-3">
              <fieldset>
                <Form.Group>{this.requestHelpDisp()}</Form.Group>
              </fieldset>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            {this.questionDisp(
              "นิสิตอยากให้ทางคณะช่วยเหลือด้านไหนบ้าง สามารถเสนอแนะได้ตามหัวข้อด้านล่าง"
            )}
          </Col>
        </Row>
        <Row>
          <Col className="ml-5 mr-5 mt-1 mb-1">
            <Form className="ml-3">
              <fieldset>
                <Form.Group>{this.helpAnswerDisp()}</Form.Group>
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

  contentDisp = (text) => {
    return (
      <Row>
        <Col className="text-center">
          <h4>{text}</h4>
        </Col>
      </Row>
    );
  };

  contactDisp = () => {
    return (
      <div>
        <Container id="summary-tel-box">
          {this.questionDisp("ขอบคุณที่ร่วมทำแบบประเมิน")}
          {this.contentDisp("แหล่งอ้างอิง : กรมสุขภาพจิต กระทรวงสาธารณสุข")}
        </Container>
        <Container id="summary-tel-box">
          {this.questionDisp(
            "หากนิสิตต้องการความช่วยเหลือหรือมีปัญหาสามารถปรึกษาได้ที่"
          )}
          {this.contentDisp(
            "หน่วยส่งเสริมสุขภาวะนิสิต (ศูนย์ให้บริการปรึกษาเชิงจิตวิทยาสำหรับนิสิต)"
          )}
          <Row>
            <Col className="text-center mb-3">
              <h4>
                เบอร์โทร 02 218 0540 website :
                <a href="https://wellness.chula.ac.th/">
                  {" "}
                  wellness.chula.ac.th
                </a>
              </h4>
            </Col>
          </Row>
          {this.contentDisp(
            "ภารกิจกิจการนิสิตคณะวิศวกรรมศาสตร์ เบอร์โทร 02 218 6349"
          )}
          <Row>
            <Col className="text-center mb-3">
              <h4>
                <a href="https://www.facebook.com/%E0%B8%81%E0%B8%B4%E0%B8%88%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%99%E0%B8%B4%E0%B8%AA%E0%B8%B4%E0%B8%95-%E0%B8%84%E0%B8%93%E0%B8%B0%E0%B8%A7%E0%B8%B4%E0%B8%A8%E0%B8%A7%E0%B8%81%E0%B8%A3%E0%B8%A3%E0%B8%A1%E0%B8%A8%E0%B8%B2%E0%B8%AA%E0%B8%95%E0%B8%A3%E0%B9%8C-%E0%B8%88%E0%B8%B8%E0%B8%AC%E0%B8%B2%E0%B8%AF-%E0%B9%80%E0%B8%9E%E0%B8%88-858015854257493/">
                  Facebook : กิจการนิสิต-คณะวิศวกรรมศาสตร์-จุฬาฯ-เพจ
                </a>
              </h4>
            </Col>
          </Row>
          {this.contentDisp("ภารกิจทะเบียนและประเมินผล เบอร์โทร 02 218 6300")}
          <Row>
            <Col className="text-center">
              <h4>
                <a href="https://th-th.facebook.com/%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B8%97%E0%B8%B0%E0%B9%80%E0%B8%9A%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%A1%E0%B8%B4%E0%B8%99%E0%B8%9C%E0%B8%A5-%E0%B8%84%E0%B8%93%E0%B8%B0%E0%B8%A7%E0%B8%B4%E0%B8%A8%E0%B8%A7%E0%B8%81%E0%B8%A3%E0%B8%A3%E0%B8%A1%E0%B8%A8%E0%B8%B2%E0%B8%AA%E0%B8%95%E0%B8%A3%E0%B9%8C-%E0%B8%88%E0%B8%B8%E0%B8%AC%E0%B8%B2%E0%B8%AF-1656445181234187/">
                  Facebook : งานทะเบียนและประเมินผล คณะวิศวกรรมศาสตร์ จุฬาฯ
                </a>
              </h4>
            </Col>
          </Row>
        </Container>
      </div>
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
    if (this.state.finish === "true") {
      return <div className="main-bg">{this.contactDisp()}</div>;
    }
    if (this.state.setLoading) {
      return <LoadSpinner />;
    }
    return (
      <div className="main-bg">
        {this.showResult()}
        {this.helpQuestion()}
      </div>
    );
  }
}

export default Summary;
