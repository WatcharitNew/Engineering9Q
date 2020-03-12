import React, { Component } from "react";
import "./Home.css";
import NavBar from "./NavBar";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import LocalStorageService from "./LocalStorageService";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      id: "",
      major: "cp"
    };
  }

  componentDidMount = () => {
    LocalStorageService.checkOut();
  };

  submit = () => {
    LocalStorageService.setUserName(this.state.name);
    LocalStorageService.setUserID(this.state.id);
    LocalStorageService.setMajor(this.state.major);
  };

  nameArea = () => {
    return (
      <Row className="mt-5 mb-1">
        <Col xs={2}></Col>
        <Col xs={3} className="text-right">
          <Form.Label>
            <h4 className="text-white">ชื่อ-นามสกุล</h4>
          </Form.Label>
        </Col>
        <Col xs={5} className="text-left">
          <Form.Control
            type="text"
            placeholder="ชื่อ นามสกุล"
            required
            onChange={e => {
              this.setState({ name: e.target.value });
            }}
            value={this.state.name}
          />
        </Col>
      </Row>
    );
  };

  idArea = () => {
    return (
      <Row className="mt-1">
        <Col xs={2}></Col>
        <Col xs={3} className="text-right">
          <Form.Label>
            <h4 className="text-white">รหัสนิสิต</h4>
          </Form.Label>
        </Col>
        <Col xs={3} className="text-left">
          <Form.Control
            type="text"
            placeholder="xxxxxxxx21"
            required
            onChange={e => {
              this.setState({ id: e.target.value });
            }}
            value={this.state.id}
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
  }

  majorArea = () => {
    return (
      <Row className="mt-1 mb-5">
        <Col xs={2}></Col>
        <Col xs={3} className="text-right">
          <Form.Label>
            <h4 className="text-white">ภาควิชา</h4>
          </Form.Label>
        </Col>
        <Col xs={3} className="text-left">
          {this.getOption()}
        </Col>
        <Col xs={2}></Col>
      </Row>);
  };

  submitBtn = () => {
    return (
      <Row>
        <Col className="text-center">
          <Button
            id="begin-button"
            type="submit"
            href="/instruction"
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
    return (
      <div className="main-bg">
        <NavBar />
        <Container id="home-box">
          <Row>
            <Col className="text-center">
              <h1 className="text-white">แบบประเมิณ 9Q</h1>
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
