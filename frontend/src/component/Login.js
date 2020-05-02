import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Login.css";
import { Redirect } from "react-router-dom";
import SessionStorageService from "../SessionStorageService";
import axios from "axios";
import Swal from "sweetalert2";
var CryptoJS = require("crypto-js");
var Qs = require("qs");

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirectToAdminHome: false,
      redirectToInstruction: false,
    };
  }

  loginArea = () => {
    return (
      <Row className="mt-5 text-light">
        <Col>
          <Form>
            <Row className="justify-content-sm-center">
              <Form.Label column lg="2" md="3" sm="4" xs="3">
                <h4 className="text-right">Username</h4>
              </Form.Label>
              <Col lg="4" md="5" sm="5">
                <Form.Control
                  as="input"
                  placeholder="Username"
                  onChange={(e) => {
                    if (e.target.value.length <= 10) {
                      this.setState({ username: e.target.value });
                    }
                  }}
                  value={this.state.username}
                />
              </Col>
            </Row>
            <Row className="justify-content-sm-center">
              <Form.Label column lg="2" md="3" sm="4" xs="3">
                <h4 className="text-right">Password</h4>
              </Form.Label>
              <Col lg="4" md="5" sm="5">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    this.setState({ password: e.target.value });
                  }}
                  value={this.state.password}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      this.submit();
                    }
                  }}
                />
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    );
  };

  submit = () => {
    if (this.state.username === process.env.REACT_APP_ADMIN_USERNAME && this.state.password === process.env.REACT_APP_ADMIN_PASSWORD) {
      var ciphertext = CryptoJS.AES.encrypt(process.env.REACT_APP_ADMIN_USERNAME, process.env.REACT_APP_ADMIN_PASSWORD).toString();
      SessionStorageService.setToken(ciphertext);
      this.setState({ redirectToAdminHome: true });
      this.setState({ username: "", password: "" });
    } else {
      const requestBody = {
        q: "token",
        client_key: process.env.REACT_APP_STUDENT_ENG_CHULA_CLIENT_KEY,
        client_secret: process.env.REACT_APP_STUDENT_ENG_CHULA_CLIENT_SECRET,
      };

      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      axios
        .post(
          process.env.REACT_APP_STUDENT_ENG_CHULA_URL,
          Qs.stringify(requestBody),
          config
        )
        .then((response) => {
          switch (response.status) {
            // Created
            case 200:
              const requestBodyLogin = {
                q: "cunetauth",
                token: response.data.token,
                student_id: this.state.username,
                password: this.state.password,
              };

              axios
                .post(
                  process.env.REACT_APP_STUDENT_ENG_CHULA_URL,
                  Qs.stringify(requestBodyLogin),
                  config
                )
                .catch(() => {
                  this.setState({ username: "", password: "" });
                  Swal.fire({
                    html: "Username or Password is invalid",
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "ตกลง",
                  });
                  return null;
                })
                .then((response) => {
                  if (response !== null) {
                    switch (response.status) {
                      // Created
                      case 200:
                        var nameEncrypt = CryptoJS.AES.encrypt(
                          response.data.data.name,
                          "username"
                        ).toString();
                        var idEncrypt = CryptoJS.AES.encrypt(
                          response.data.data.student_id,
                          "id"
                        ).toString();
                        var majorEncrypt = CryptoJS.AES.encrypt(
                          response.data.data.department,
                          "major"
                        ).toString();

                        SessionStorageService.setUserName(nameEncrypt);
                        SessionStorageService.setUserID(idEncrypt);
                        SessionStorageService.setMajor(majorEncrypt);
                        this.setState({ username: "", password: "" });
                        this.setState({ redirectToInstruction: true });
                        break;

                      default:
                        Swal.fire({
                          html: "Username or Password is invalid",
                          icon: "error",
                          confirmButtonColor: "#3085d6",
                          confirmButtonText: "ตกลง",
                        });
                        console.log("Status code is " + response.status);
                        break;
                    }
                  }
                });
              break;

            // Other case
            default:
              console.log("Status code is " + response.status);
          }
        });
    }
  };

  submitBtn = () => {
    return (
      <Row>
        <Col className="text-center mt-4">
          <Button
            id="begin-button"
            type="submit"
            onClick={() => {
              this.submit();
            }}
            className="shadow"
          >
            Login
          </Button>
        </Col>
      </Row>
    );
  };

  render() {
    if (this.state.redirectToAdminHome) {
      return <Redirect to="/admin/home" />;
    }
    if (this.state.redirectToInstruction) {
      return <Redirect to="/instruction" />;
    }
    return (
      <div className="main-bg">
        <Container id="admin-login">
          <Row>
            <Col className="text-center">
              <h1 className="text-white label-topic">Engineering-9Q</h1>
            </Col>
          </Row>
          {this.loginArea()}
          {this.submitBtn()}
        </Container>
      </div>
    );
  }
}

export default Login;
