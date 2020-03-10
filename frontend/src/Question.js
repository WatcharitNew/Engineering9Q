import React, { Component } from "react";
import "./Question.css";
import NavBar from "./NavBar";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIdx: 0,
      listAnswer: [0,0,0,0,0,0,0,0,0],
    };
  }

  nextQuestion = () => {
    if(this.state.questionIdx < 9){
        this.setState({questionIdx: this.state.questionIdx + 1});
    }
  };

  prevQuestion = () => {
    if(this.state.questionIdx > 0){
      this.setState({questionIdx: this.state.questionIdx - 1});
    }
  };

  render() {
    const label = (
      <h2>
        ในช่วง 2 สัปดาห์ที่ผ่านมา รวมทั้งวันนี้ ท่านมีอาการเหล่านี้บ่อยแค่ไหน
      </h2>
    );
    const questionList = [
      "เบื่อ ไม่สนใจอยากทำอะไร",
      "ไม่สบายใจ ซึมเศร้า ท้อแท้",
      "หลับยาก หรือหลับๆ ตื่นๆ หรือหลับมากไป",
      "เหนื่อยง่าย หรือ ไม่ค่อยมีแรง",
      "เบื่ออาหาร หรือ กินมากเกินไป",
      "รู้สึกไม่ดีกับตัวเอง คิดว่าตัวเองล้มเหลวหรือทำให้ตนเองหรือครอบครัวผิดหวัง",
      "สมาธิไม่ดีเวลาทำอะไร เช่น ดูโทรทัศน์ ฟังวิทยุ หรือทำงานที่ต้องใช้ความตั้งใจ",
      "พูดช้า ทำอะไรช้าลง จนคนอื่นสังเกตเห็นได้ หรือกระสับกระส่ายไม่สามารถอยู่นิ่งได้เหมือนที่เคยเป็น",
      "คิดทำร้ายตนเอง หรือคิดว่าถ้าตายไปคงจะดี"
    ];
    const answerList = [
      "ไม่มีเลย",
      "เป็นบางวัน 1-7 วัน",
      "เป็นบ่อย >7 วัน",
      "เป็นทุกวัน"
    ];
    var answerDisplay = answerList.map((ans, idx) => (
      <Form.Check key={idx}
        custom
        type="radio"
        label={ans}
        name={questionList[this.state.questionIdx]}
        id={idx+1}
        onChange={(e)=>{
          let listAns = this.state.listAnswer;
          listAns[this.state.questionIdx] = idx+1;
          this.setState({listAnswer: listAns});
          alert(this.state.listAnswer);
        }}
        checked={this.state.listAnswer[this.state.questionIdx] === idx+1}
      />
    ));
    var questionDisp = <h3>{questionList[this.state.questionIdx]}</h3>;
    return (
      <div className="main-bg">
        <NavBar />
        <Container id="question-box">
          <Row>
            <Col className="text-center">{label}</Col>
          </Row>
          <Row>
            <Col>{questionDisp}</Col>
          </Row>
          <Row>
            <Col>
              <Form>
                <fieldset>
                  <Form.Group>
                    {answerDisplay}
                  </Form.Group>
                </fieldset>
              </Form>
            </Col>
          </Row>
        </Container>
        <Container id="button-box">
          <Row>
            <Col className="text-left">
              <Button onClick={() => this.prevQuestion()}>
                <FaChevronCircleLeft />
              </Button>
            </Col>
            <Col m={8}></Col>
            <Col className="text-right">
              <Button onClick={() => this.nextQuestion()}>
                <FaChevronCircleRight />
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Question;
