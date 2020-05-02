import React, { Component } from "react";
import { Container, Row, Col, Spinner, Table, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./AdminStudent.css";
import SessionStorageService from "../SessionStorageService";
import { FaChevronCircleLeft } from "react-icons/fa";
var Qs = require("qs");

class AdminStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
      isUserDataLoad: false,
      redirectToAdminHome: false,
    };
  }

  fetchData = () => {
    const requestBody = {
      q: "getUserByUserId",
      userId: SessionStorageService.getUserID(),
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
            const userData = response.data[0];
            userData.help = [
              response.data[0].helpStudy,
              response.data[0].helpHealth,
              response.data[0].helpFamily,
              response.data[0].helpOther,
            ];
            this.setState({ userData: userData, isUserDataLoad: true });
            break;

          // Other case
          default:
            console.log("Status code is " + response.status);
        }
      });
  };

  componentDidMount = () => {
    this.fetchData();
  };

  headScoreData = () => {
    return (
      <thead className="bg-dark text-light">
        <tr>
          <td className="text-center">
            <h5>คำถาม</h5>
          </td>
          <td className="text-center">
            <h5>คะแนนที่ได้</h5>
          </td>
        </tr>
      </thead>
    );
  };

  showScoreData = () => {
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
    return questionList.map((quest, index) => (
      <tr key={index}>
        <td>
          <h5>{quest}</h5>
        </td>
        <td className="text-center">
          {this.state.userData.scores.substring(2 * index, 2 * index + 1)}
        </td>
      </tr>
    ));
  };

  headHelpData = () => {
    return (
      <thead className="bg-dark text-light">
        <tr>
          <td className="text-center">
            <h5>ต้องการความช่วยเหลือ</h5>
          </td>
          <td className="text-center">
            <h5 className="align-center">รายละเอียด</h5>
          </td>
        </tr>
      </thead>
    );
  };

  showHelpData = () => {
    const helpList = ["ด้านการเรียน", "ด้านสุขภาพ", "ด้านครอบครัว", "อื่นๆ"];
    return helpList.map((help, index) => (
      <tr key={index}>
        <td>
          <h5>{help}</h5>
        </td>
        <td>
          <h5>{this.state.userData.help[index]}</h5>
        </td>
      </tr>
    ));
  };

  scoreDisp = () => {
    return (
      <Row className="pl-3 pr-3 mt-4">
        <Table responsive striped bordered hover size="sm">
          {this.headScoreData()}
          <tbody>{this.showScoreData()}</tbody>
        </Table>
      </Row>
    );
  };

  helpDisp = () => {
    return (
      <Row className="pl-3 pr-3 mt-4">
        <Table responsive striped bordered hover size="sm">
          {this.headHelpData()}
          <tbody>{this.showHelpData()}</tbody>
        </Table>
      </Row>
    );
  };

  backToHome = () => {
    this.setState({ redirectToAdminHome: true });
  };

  render() {
    if (!this.state.isUserDataLoad) {
      return (
        <div className="main-bg text-center">
          <Spinner
            animation="grow"
            variant="warning"
            className="loading spinner"
          />
        </div>
      );
    }
    if (this.state.redirectToAdminHome) return <Redirect to="/admin/home" />;
    return (
      <div className="main-bg">
        <Button
          className="shadow admin-backbtn"
          onClick={() => this.backToHome()}
        >
          <h4>
            <FaChevronCircleLeft />
            Back
          </h4>
        </Button>
        <Container id="admin-student">
          <Row className="mt-3 pt-3 text-center">
            <Col>
              <h3 className="pt-2 pb-2 background-orange text-light label-curve ">
                ผลการทำแบบทดสอบ
              </h3>
            </Col>
          </Row>
          <Row className="mt-3 pt-3 pl-5">
            <Col lg="6" md="8" sm="10">
              <h3>
                <b>ชื่อ</b> {this.state.userData.name}
              </h3>
            </Col>
            <Col lg="6" md="8" sm="10">
              <h3>
                <b>รหัสนิสิต</b> {this.state.userData.userId}
              </h3>
            </Col>
          </Row>
          <Row className="pl-5">
            <Col lg="6" md="8" sm="10">
              <h3>
                <b>ภาค</b> {this.state.userData.major}
              </h3>
            </Col>
            <Col lg="6" md="8" sm="10">
              <h3>
                <b>คะแนนรวม</b> {this.state.userData.sumScore}
              </h3>
            </Col>
          </Row>
          {this.scoreDisp()}
          {this.helpDisp()}
          <Row className="pl-3 mt-4">
            <Col>
              <h4>
                <b>อธิบายความกังวล</b>
              </h4>
            </Col>
          </Row>
          <Row className="pl-5 mt-3 worry-box">
            <Col>
              <ul>
                <li>
                  <h5>{this.state.userData.worryText}</h5>
                </li>
              </ul>
            </Col>
          </Row>
          <Row className="pl-3 mt-4 pb-3">
            <Col lg={4} md={5} xs={6}>
              <h4>
                <b>ต้องการพบนักจิตแพทย์</b>
              </h4>
            </Col>
            <Col>
              <h4
                className={
                  this.state.userData.isWantPsychologist === "1"
                    ? "want"
                    : "not-want"
                }
              >
                {this.state.userData.isWantPsychologist === "1"
                  ? "ต้องการพบ"
                  : "ไม่ต้องการพบ"}
              </h4>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default AdminStudent;
