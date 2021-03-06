import React, { Component } from "react";
import "./Instruction.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

class Instruction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToQuestion: false,
    };
  }

  instructionArea = () => {
    return (
      <ul>
        <li>
          <h5>
            กรุณาเลือกคำตอบในช่องที่มีข้อความตรงกับตัวท่านมากที่สุด
            และขอความร่วมมือตอบคำถามทุกข้อ
          </h5>
        </li>
        <li>
          <h5>
            คำถามต่อไปนี้จะถามถึงประสบการณ์ของท่านในช่วง 2
            สัปดาห์ที่ผ่านมาจนถึงปัจจุบัน
            ให้ท่านสำรวจตัวท่านเองและประเมินเหตุการณ์
            อาการหรือความคิดเห็นและความรู้สึกของท่านว่าอยู่ในระดับใด
            แล้วตอบลงในช่องคำตอบที่เป็นจริงกับตัวท่านมากที่สุด{" "}
          </h5>{" "}
          <br />
          <div className="text-center instruction-last">
            <h4>
              การตอบแบบสอบถามในครั้งนี้จะเป็นประโยชน์อย่างยิ่งในการใช้เป็นแนวทางเพื่อช่วยพัฒนาระบบการดูแลนิสิตของคณะวิศวกรรมศาสตร์ต่อไป
            </h4>
          </div>
        </li>
      </ul>
    );
  };

  render() {
    if (this.state.redirectToQuestion) return <Redirect to="/question" />;
    return (
      <div className="main-bg">
        <Container>
          <Row>
            <Col className="text-center text-light mt-5">
              <h1 className="label-topic">แบบประเมิน 9Q</h1>
            </Col>
          </Row>
        </Container>
        <Container id="instruction-box">
          <Row>
            <Col className="text-center">
              <h3 className="pt-2 pb-2 background-orange text-light label-curve">
                คำชี้แจง
              </h3>
            </Col>
          </Row>
          <Row className="instruction-area mt-3 mb-3">
            <Col className="ml-3 mr-3">{this.instructionArea()}</Col>
          </Row>
          <Row className="instruction-btn mb-3">
            <Col className="text-center ">
              <Button
                size="lg"
                type="submit"
                onClick={() => this.setState({ redirectToQuestion: true })}
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
