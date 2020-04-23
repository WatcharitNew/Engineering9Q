import React, { Component } from "react";
import "./Home.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import SessionStorageService from "../SessionStorageService";
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      id: "",
      major: "cp",
      redirectToQuestion: false
    };
  }

  componentDidMount = () => {
    SessionStorageService.checkOut();
  };

  submit = () => {
    if (this.idHandler(this.state.id) && this.nameHandler(this.state.name)) {
      SessionStorageService.setUserName(this.state.name);
      SessionStorageService.setUserID(this.state.id);
      SessionStorageService.setMajor(this.state.major);
      this.setState({ redirectToQuestion: true });
    } else {
      var text = [];
      if (!this.nameHandler(this.state.name)) {
        text.push("กรุณาใส่ ชื่อ-นามสกุล เป็นภาษาไทยเท่านั้น");
      }
      if (!this.idHandler(this.state.id)) {
        text.push("กรุณาใส่ รหัสนิสิต เป็นตัวเลข10หลักเท่านั้น และลงท้ายด้วย 21");
      }
      Swal.fire({
        html: text,
        icon: 'error',
        confirmButtonColor: "#3085d6",
        confirmButtonText: "ตกลง",
      });
    }
  };

  nameHandler = name => {
    const regEx = /^[ก-์]*[ก-์][\s[ก-์]*[ก-์]]*$/;
    return regEx.test(name);
  };

  idHandler = id => {
    const regEx = /^[0-9]{8}21$/;
    return regEx.test(id);
  };

  nameArea = () => {
    return (
      <Row className="mt-5 mb-1">
        <Col xs={2}></Col>
        <Col xs={3} className="text-right">
          <Form.Label>
            <h4 className="text-white label-topic">ชื่อ-นามสกุล</h4>
            <p className="text-white">ภาษาไทยเท่านั้น</p>
          </Form.Label>
        </Col>
        <Col xs={3} className="text-left">
          <Form.Control
            type="text"
            placeholder="ชื่อ นามสกุล"
            required
            onChange={e => {
              this.setState({ name: e.target.value });
            }}
            value={this.state.name}
            className="shadow"
          />
        </Col>
        <Col xs={2}></Col>
      </Row>
    );
  };

  idArea = () => {
    return (
      <Row className="mt-1">
        <Col xs={2}></Col>
        <Col xs={3} className="text-right">
          <Form.Label>
            <h4 className="text-white label-topic">รหัสนิสิต</h4>
          </Form.Label>
        </Col>
        <Col xs={3} className="text-left">
          <Form.Control
            type="text"
            placeholder="xxxxxxxx21"
            required
            onChange={e => {
              if (e.target.value.length <= 10) {
                this.setState({ id: e.target.value });
              }
            }}
            value={this.state.id}
            className="shadow"
          />
        </Col>
        <Col xs={2}></Col>
      </Row>
    );
  };

  getOption = () => {
    return (
      <Form.Control
        as="select"
        required
        onChange={e => {
          this.setState({ major: e.target.value });
        }}
        value={this.state.major}
      >
        <option value="cp">คอมพิวเตอร์</option>
        <option value="chem">เคมี</option>
        <option value="ne">นิวเคลียร์</option>
        <option value="me">เครื่องกล</option>
        <option value="ee">ไฟฟ้า</option>
        <option value="ce">โยธา</option>
        <option value="metal">โลหการ</option>
        <option value="sv">สำรวจ</option>
        <option value="env">สิ่งแวดล้อม</option>
        <option value="mining">เหมืองแร่และปิโตรเลียม</option>
        <option value="water">แหล่งน้ำ</option>
        <option value="ie">อุตสาหการ</option>
        <option value="bme">ชีวเวช</option>
        <option value="adme">ADME</option>
        <option value="aero">AERO</option>
        <option value="ice">ICE</option>
        <option value="nano">NANO</option>
        <option value="robotic">ROBOTIC</option>
      </Form.Control>
    );
  };

  majorArea = () => {
    return (
      <Row className="mt-1 mb-5">
        <Col xs={2}></Col>
        <Col xs={3} className="text-right">
          <Form.Label>
            <h4 className="text-white label-topic">ภาควิชา</h4>
          </Form.Label>
        </Col>
        <Col xs={3} className="text-left">
          {this.getOption()}
        </Col>
        <Col xs={2}></Col>
      </Row>
    );
  };

  submitBtn = () => {
    return (
      <Row>
        <Col className="text-center">
          <Button
            id="begin-button"
            type="submit"
            onClick={() => {
              this.submit();
            }}
          >
            เริ่มทำแบบทดสอบ
          </Button>
        </Col>
      </Row>
    );
  };

  render() {
    if (this.state.redirectToQuestion) return <Redirect to="/instruction" />;
    return (
      <div className="main-bg">
        <Container id="home-box">
          <Row>
            <Col className="text-center">
              <h1 className="text-white label-topic">แบบประเมิน 9Q</h1>
            </Col>
          </Row>
          {this.nameArea()}
          {this.idArea()}
          {this.majorArea()}
          {this.submitBtn()}
        </Container>
      </div>
    );
  }
}

export default Home;
