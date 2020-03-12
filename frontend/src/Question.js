import React, { Component } from "react";
import "./Question.css";
import NavBar from "./NavBar";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import LocalStorageService from "./LocalStorageService";
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIdx: 0,
      listAnswer: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      maxAnsQuest: 0,
      redirectToSummary: false,
    };
  }

  nextQuestion = () => {
    if (this.state.listAnswer[this.state.questionIdx] !== 0) {
      if (this.state.questionIdx < 8) {
        this.setState({ questionIdx: this.state.questionIdx + 1 });
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
            for(let i=0; i<this.state.listAnswer.length; i++){
              score += this.state.listAnswer[i]-1;
            }
            LocalStorageService.setScore(score);
            Swal.fire("ส่งคำตอบแล้ว");
            this.setState({redirectToSummary: true});
          }
        });
      }
    } else {
      alert("โปรดเลือกคำตอบก่อนไปข้อถัดไป");
    }
  };

  prevQuestion = () => {
    if (this.state.questionIdx > 0) {
      this.setState({ questionIdx: this.state.questionIdx - 1 });
    }
  };

  render() {
    if(this.state.redirectToSummary){
      return <Redirect to="summary"/>
    }
    const label = (
      <h2>
        ในช่วง 2 สัปดาห์ที่ผ่านมา รวมทั้งวันนี้ ท่านมีอาการเหล่านี้บ่อยแค่ไหน
      </h2>
    );
    const questionList = [
      "เบื่อ ไม่สนใจอยากทำอะไร",
      "ไม่สบายใจ ซึมเศร้า ท้อแท้",
      "หลับยาก หรือหลับๆ ตื่นๆ หรือหลับมากไป",
      "เบื่ออาหาร หรือ กินมากเกินไป",
      "รู้สึกไม่ดีกับตัวเอง คิดว่าตัวเองล้มเหลวหรือทำให้ตนเองหรือครอบครัวผิดหวัง",
      "สมาธิไม่ดีเวลาทำอะไร เช่น ดูโทรทัศน์ ฟังวิทยุ หรือทำงานที่ต้องใช้ความตั้งใจ",
      "เหนื่อยง่าย หรือ ไม่ค่อยมีแรง",
      "พูดช้า ทำอะไรช้าลง จนคนอื่นสังเกตเห็นได้ หรือกระสับกระส่ายไม่สามารถอยู่นิ่งได้เหมือนที่เคยเป็น",
      "คิดทำร้ายตนเอง หรือคิดว่าถ้าตายไปคงจะดี"
    ];
    const answerList = [
      <h4>ไม่มีเลย</h4>,
      <h4>เป็นบางวัน 1-7 วัน</h4>,
      <h4>เป็นบ่อย >7 วัน</h4>,
      <h4>เป็นทุกวัน</h4>
    ];
    var answerDisplay = answerList.map((ans, idx) => (
      <Form.Check
        key={idx}
        custom
        type="radio"
        label={ans}
        name={questionList[this.state.questionIdx]}
        id={idx + 1}
        onChange={e => {
          let listAns = this.state.listAnswer;
          listAns[this.state.questionIdx] = idx + 1;
          this.setState({ listAnswer: listAns });
        }}
        checked={this.state.listAnswer[this.state.questionIdx] === idx + 1}
      />
    ));
    var questionDisp = (
      <h4>
        ข้อ {this.state.questionIdx + 1} {questionList[this.state.questionIdx]}
      </h4>
    );

    return (
      <div className="main-bg">
        <NavBar />
        <Container id="question-box" className="shadow">
          <Row>
            <Col className="text-center">{label}</Col>
          </Row>
          <Row>
            <Col className="ml-4 mt-3 mb-3">{questionDisp}</Col>
          </Row>
          <Row>
            <Col>
              <Form className="ml-4">
                <fieldset>
                  <Form.Group>{answerDisplay}</Form.Group>
                </fieldset>
              </Form>
            </Col>
          </Row>
        </Container>
        <Container id="button-box">
          <Row>
            <Col className="text-left">
              <Button className="shadow" onClick={() => this.prevQuestion()}>
                <h4>
                  <FaChevronCircleLeft />
                </h4>
              </Button>
            </Col>
            <Col m={8}></Col>
            <Col className="text-right">
              <Button className="shadow" onClick={() => this.nextQuestion()}>
                <h4>
                  <FaChevronCircleRight />
                </h4>
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Question;
