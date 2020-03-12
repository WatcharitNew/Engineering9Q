import React, { Component } from "react";
import "./Question.css";
import NavBar from "./NavBar";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import LocalStorageService from "./LocalStorageService";
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";
import axios from "axios";
var utilities = require("./Utilities.json");

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIdx: 0,
      listAnswer: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      maxAnsQuest: 0,
      redirectToSummary: false,
      userID: LocalStorageService.getUserID(),
      userName: LocalStorageService.getUserName(),
      major: LocalStorageService.getMajor(),
      answerHelp: "",
      showHelpQuestion: false,
      redirectToHome: false,
    };
  }

  componentDidMount = () => {
    console.log(this.state.userID);
    if(this.state.userID === ""){
      this.setState({redirectToHome: true});
    }
  }

  nextQuestion = () => {
    if (this.state.listAnswer[this.state.questionIdx] !== 0) {
      if (this.state.questionIdx < 8) {
        this.setState({ questionIdx: this.state.questionIdx + 1 });
      } else if (this.state.questionIdx === 8) {
        this.setState({ questionIdx: this.state.questionIdx + 1 });
        this.setState({ showHelpQuestion: true });
      } else {
        Swal.fire({
          title: "ต้องการส่งคำตอบ?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "ใช่",
          cancelButtonText: "ไม่"
        }).then(result => {
          if (result.value) {
            var score = 0;
            var listScore = [];
            for (let i = 0; i < this.state.listAnswer.length; i++) {
              let tmpScore = this.state.listAnswer[i] - 1;
              score += tmpScore;
              listScore.push(tmpScore);
            }
            LocalStorageService.setScore(score);
            Swal.fire("ส่งคำตอบแล้ว");
            axios
              .post(utilities["backend-url"] + "/users", {
                userId: this.state.userID,
                name: this.state.userName,
                major: this.state.major,
                help: this.state.answerHelp,
                scores: listScore
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
            this.setState({ redirectToSummary: true });
          }
        });
      }
    } else {
      Swal.fire({
        title: "โปรดเลือกคำตอบก่อนไปข้อถัดไป",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "โอเค"
      });
    }
  };

  prevQuestion = () => {
    if (this.state.questionIdx > 0) {
      this.setState({ questionIdx: this.state.questionIdx - 1 });
      this.setState({ showHelpQuestion: false });
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
      "นิสิตอยากให้ทางคณะช่วยเหลือด้านไหนบ้าง"
    ];
    return (
      <h4>
        ข้อ {this.state.questionIdx + 1} {questionList[this.state.questionIdx]}
      </h4>
    );
  };

  label = () => {
    return (
      <h2 className="label-topic">
        ในช่วง 2 สัปดาห์ที่ผ่านมา รวมทั้งวันนี้ ท่านมีอาการเหล่านี้บ่อยแค่ไหน
      </h2>
    );
  }

  answerDisp = () => {
    const answerList = [
      <h4>ไม่มีเลย</h4>,
      <h4>เป็นบางวัน 1-7 วัน</h4>,
      <h4>เป็นบ่อย >7 วัน</h4>,
      <h4>เป็นทุกวัน</h4>
    ];
    if (this.state.showHelpQuestion) {
      return (
        <Form.Control
          as="textarea"
          rows="3"
          onChange={e => {
            this.setState({ answerHelp: e.target.value });
          }}
          className="shadow"
        />
      );
    } else {
      return (answerList.map((ans, idx) => (
        <Form.Check
          key={idx}
          custom
          type="radio"
          label={ans}
          id={idx + 1}
          onChange={e => {
            let listAns = this.state.listAnswer;
            listAns[this.state.questionIdx] = idx + 1;
            this.setState({ listAnswer: listAns });
          }}
          checked={this.state.listAnswer[this.state.questionIdx] === idx + 1}
        />
      )));
    } 
  }

  render() {
    if(this.state.redirectToHome) {
      return <Redirect to="/" />;
    }
    if (this.state.redirectToSummary) {
      return <Redirect to="/summary" />;
    }

    return (
      <div className="main-bg">
        <NavBar />
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
