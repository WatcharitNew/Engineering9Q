import React, { Component } from "react";
import "./Question.css";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import SessionStorageService from "../SessionStorageService";
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";
import axios from "axios";
import LoadSpinner from "./LoadSpinner";
var utilities = require("../Utilities.json");
var Qs = require("qs");
var CryptoJS = require("crypto-js");

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIdx: 0,
      listAnswer: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      maxAnsQuest: 0,
      redirectToSummary: false,
      userID: SessionStorageService.getUserID(),
      userName: SessionStorageService.getUserName(),
      major: SessionStorageService.getMajor(),
      redirectToHome: false,
      fade: false,
      setLoading: false,
    };
  }

  componentDidMount = () => {
    console.log(this.state.userID);
    if (this.state.userID === "") {
      this.setState({ redirectToHome: true });
    }
    SessionStorageService.setFinish(false);
  };

  nextQuestion = () => {
    if (this.state.listAnswer[this.state.questionIdx] !== 0) {
      if (this.state.questionIdx < 8) {
        this.setState({ questionIdx: this.state.questionIdx + 1 });
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
            var score = 0;
            var listScore = [];
            for (let i = 0; i < this.state.listAnswer.length; i++) {
              let tmpScore = this.state.listAnswer[i] - 1;
              score += tmpScore;
              listScore.push(tmpScore);
            }
            SessionStorageService.setScore(score);
            
            var idBytes  = CryptoJS.AES.decrypt(this.state.userID, 'id');
            var idText = idBytes.toString(CryptoJS.enc.Utf8);
            var nameBytes  = CryptoJS.AES.decrypt(this.state.userName, 'username');
            var nameText = nameBytes.toString(CryptoJS.enc.Utf8);
            var majorBytes  = CryptoJS.AES.decrypt(this.state.major, 'major');
            var majorText = majorBytes.toString(CryptoJS.enc.Utf8);

            const requestBody = {
              q: "createNewUser",
              userId: idText,
              name: nameText,
              major: majorText,
              scores: listScore.toString(),
              sumScore: SessionStorageService.getScore(),
            };

            const config = {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            };

            axios
              .post(
                utilities["backend-url"] + "/api.php",
                Qs.stringify(requestBody),
                config
              )
              .then((response) => {
                switch (response.status) {
                  // Created
                  case 200:
                    console.log("already push");
                    Swal.fire("ส่งคำตอบแล้ว");
                    this.setState({ redirectToSummary: true });
                    break;

                  // Other case
                  default:
                    console.log("Status code is " + response.status);
                }
              });
          }
        });
      }
    } else {
      Swal.fire({
        text: "โปรดเลือกคำตอบก่อนไปข้อถัดไป",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "โอเค",
      });
    }
  };

  prevQuestion = () => {
    if (this.state.questionIdx > 0) {
      this.setState({ questionIdx: this.state.questionIdx - 1 });
    }
  };

  backBtn = () => {
    if (this.state.questionIdx === 0) return;
    return (
      <Button className="shadow" onClick={() => this.prevQuestion()}>
        <h4>
          <FaChevronCircleLeft />
        </h4>
      </Button>
    );
  };

  nextBtn = () => {
    return (
      <Button className="shadow" onClick={() => this.nextQuestion()}>
        <h4>
          <FaChevronCircleRight />
        </h4>
      </Button>
    );
  };

  questionDisp = () => {
    const questionList = [
      "เบื่อ ไม่สนใจอยากทำอะไร",
      "ไม่สบายใจ ซึมเศร้า ท้อแท้",
      "หลับยาก หรือหลับๆ ตื่นๆ หรือหลับมากไป",
      "เบื่ออาหาร หรือ กินมากเกินไป",
      "รู้สึกไม่ดีกับตัวเอง คิดว่าตัวเองล้มเหลวหรือทำให้ตนเองหรือครอบครัวผิดหวัง",
      "สมาธิไม่ดีเวลาทำอะไร เช่น ดูโทรทัศน์ ฟังวิทยุ หรือทำงานที่ต้องใช้ความตั้งใจ",
      "เหนื่อยง่าย หรือ ไม่ค่อยมีแรง",
      "พูดช้า ทำอะไรช้าลง จนคนอื่นสังเกตเห็นได้ หรือกระสับกระส่ายไม่สามารถอยู่นิ่งได้เหมือนที่เคยเป็น",
      "คิดทำร้ายตนเอง หรือคิดว่าถ้าตายไปคงจะดี",
    ];
    return (
      <h4 className={this.state.fade ? "question-fade" : ""}>
        <b>
          ข้อ {this.state.questionIdx + 1}{" "}
          {questionList[this.state.questionIdx]}
        </b>
      </h4>
    );
  };

  label = () => {
    return (
      <h2 className="background-orange text-light pt-3 pb-3 label-curve label-topic">
        ในช่วง 2 สัปดาห์ที่ผ่านมา รวมทั้งวันนี้ ท่านมีอาการเหล่านี้บ่อยแค่ไหน
      </h2>
    );
  };

  answerDisp = () => {
    const answerList = [
      <h4>ไม่มีเลย</h4>,
      <h4>เป็นบางวัน 1-7 วัน</h4>,
      <h4>เป็นบ่อย >7 วัน</h4>,
      <h4>เป็นทุกวัน</h4>,
    ];
    return answerList.map((ans, idx) => (
      <Form.Check
        className={this.state.fade ? "question-fade" : ""}
        key={idx}
        custom
        type="radio"
        label={ans}
        id={idx + 1}
        onChange={(e) => {
          let listAns = this.state.listAnswer;
          listAns[this.state.questionIdx] = idx + 1;
          var fade = this.state.questionIdx < 8 ? true : false;
          this.setState({ listAnswer: listAns, fade: fade });
          setTimeout(() => {
            //Start the timer
            this.nextQuestion();
            this.setState({ fade: false });
          }, 800);
        }}
        checked={this.state.listAnswer[this.state.questionIdx] === idx + 1}
      />
    ));
  };

  render() {
    if (this.state.redirectToSummary) {
      return <Redirect to="/summary" />;
    }
    if (this.state.setLoading) {
      return <LoadSpinner />;
    }

    return (
      <div className="main-bg">
        <Container id="question-box" className="shadow">
          <Row>
            <Col className="text-center">{this.label()}</Col>
          </Row>
          <Row>
            <Col className="ml-4 mt-3 mb-3">{this.questionDisp()}</Col>
          </Row>
          <Row>
            <Col>
              <Form className="ml-4">
                <fieldset>
                  <Form.Group>{this.answerDisp()}</Form.Group>
                </fieldset>
              </Form>
            </Col>
          </Row>
        </Container>
        <Container id="button-box">
          <Row>
            <Col className="text-left">{this.backBtn()}</Col>
            <Col m={8}></Col>
            <Col className="text-right">{this.nextBtn()}</Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Question;
