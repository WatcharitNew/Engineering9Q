import React, { Component } from "react";
import { Container, Row, Col, Nav, Table } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./AdminHome.css";
import { Pie } from "react-chartjs-2";
import SessionStorageService from "../SessionStorageService";
import LoadSpinner from "./LoadSpinner";
var Qs = require("qs");

class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDatas: [],
      isUserDataLoad: false,
      labels: ["1-star (น้อย)", "2-star (ปานกลาง)", "3-star (มาก)"],
      datasets: [
        {
          data: [0, 0, 0],
          backgroundColor: ["#00af09", "#ffd000", "#b60000"],
        },
      ],
      filter: "graph",
      status: {
        GRAPH: "graph",
        ONESTAR: "onestar",
        TWOSTAR: "twostar",
        THREESTAR: "threestar",
      },
      dataCategory: {
        onestar: [],
        twostar: [],
        threestar: [],
      },
      major: {
        cp: "คอมพิวเตอร์",
        chem: "เคมี",
        ne: "นิวเคลียร์",
        me: "เครื่องกล",
        ee: "ไฟฟ้า",
        ce: "โยธา",
        metal: "โลหการ",
        sv: "สำรวจ",
        env: "สิ่งแวดล้อม",
        mining: "เหมืองแร่และปิโตรเลียม",
        water: "แหล่งน้ำ",
        ie: "อุตสาหการ",
        bme: "ชีวเวช",
        ise: "ISE",
      },
      redirectToAdminStudent: false,
    };
  }

  fetchData = () => {
    const requestBody = {
      q: "getUserByFilter",
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
            const userDatas = response.data;
            var datasets = this.state.datasets;
            var dataCategory = this.state.dataCategory;
            for (let i = 0; i < userDatas.length; i++) {
              var total = userDatas[i].sumScore;
              if (total < 13) {
                dataCategory.onestar.push(i);
              } else if (total < 19) {
                dataCategory.twostar.push(i);
              } else {
                dataCategory.threestar.push(i);
              }
            }
            datasets[0].data[0] = dataCategory.onestar.length;
            datasets[0].data[1] = dataCategory.twostar.length;
            datasets[0].data[2] = dataCategory.threestar.length;
            this.setState({ datasets: datasets });
            console.log(this.state.datasets[0].data);
            this.setState({ dataCategory: dataCategory });
            console.log(this.state.dataCategory);
            this.setState({ userDatas: userDatas, isUserDataLoad: true });
            console.log(this.state.userDatas);
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

  tabHeader = () => {
    return (
      <Nav variant="tabs" defaultActiveKey="link-1">
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={(e) => this.filterHandler(e, this.state.status.GRAPH)}
          >
            <h5>Graph</h5>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-2"
            onClick={(e) => this.filterHandler(e, this.state.status.ONESTAR)}
          >
            <h5>One Star</h5>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-3"
            onClick={(e) => this.filterHandler(e, this.state.status.TWOSTAR)}
          >
            <h5>Two Star</h5>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-4"
            onClick={(e) => this.filterHandler(e, this.state.status.THREESTAR)}
          >
            <h5>Three Star</h5>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    );
  };

  filterHandler = (event, status) => {
    this.setState({ filter: status });
  };

  tableHeader = () => {
    if (this.state.filter === this.state.status.GRAPH) return;
    return (
      <thead>
        <tr className="text-center">
          <td className="align-middle">
            <h5>ชื่อ</h5>
          </td>
          <td className="align-middle">
            <h5>รหัสนิสิต</h5>
          </td>
          <td className="align-middle">
            <h5>ภาควิชา</h5>
          </td>
          <td className="align-middle">
            <h5>คะแนน</h5>
          </td>
        </tr>
      </thead>
    );
  };

  graphDisplay = () => {
    const options = {
      display: true,
      position: "right",
      fullWidth: true,
      reverse: false,
      lineWidth: 100,
      labels: {
        fontSize: 20,
        padding: 30,
      },
    };
    return (
      <Col className="text-center bg-white chart">
        <div className="mt-3">
          <Pie
            data={{
              labels: this.state.labels,
              datasets: this.state.datasets,
            }}
            options={{ legend: options }}
          />
        </div>
      </Col>
    );
  };

  linkToDetail = (userId) => {
    SessionStorageService.setUserID(userId);
    this.setState({ redirectToAdminStudent: true });
  };

  tableData = () => {
    if (this.state.filter === this.state.status.GRAPH) {
      return this.graphDisplay();
    }
    var idxList;
    switch (this.state.filter) {
      case this.state.status.ONESTAR:
        idxList = this.state.dataCategory.onestar;
        break;
      case this.state.status.TWOSTAR:
        idxList = this.state.dataCategory.twostar;
        break;
      case this.state.status.THREESTAR:
        idxList = this.state.dataCategory.threestar;
        break;
      default:
        idxList = this.state.dataCategory.onestar;
    }
    const data = idxList.map((id) => (
      <tr
        className="text-left link-to-detail"
        onClick={() => this.linkToDetail(this.state.userDatas[id].userId)}
      >
        <td className="align-middle">
          <h5>{this.state.userDatas[id].name}</h5>
        </td>
        <td className="align-middle text-center">
          <h5>{this.state.userDatas[id].userId}</h5>
        </td>
        <td className="align-middle text-center">
          <h5>{this.state.userDatas[id].major}</h5>
        </td>
        <td className="align-middle text-center">
          <h5>{this.state.userDatas[id].sumScore}</h5>
        </td>
      </tr>
    ));

    return (
      <Table responsive>
        {this.tableHeader()}
        <tbody>{data}</tbody>
      </Table>
    );
  };

  render() {
    if (!this.state.isUserDataLoad) {
      return <LoadSpinner />;
    }
    if (this.state.redirectToAdminStudent) {
      return <Redirect to="/admin/student" />;
    }
    return (
      <div className="main-bg">
        <Container>
          <Row className="mt-3">
            <Col className="text-center bg-white chart pt-1 pb-1">
              {this.tabHeader()}
              {this.tableData()}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default AdminHome;
