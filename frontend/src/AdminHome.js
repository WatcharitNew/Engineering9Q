import React, { Component } from "react";
import NavBar from "./NavBar";
import { Container, Row, Col, Spinner, Nav, Table } from "react-bootstrap";
import axios from "axios";
import "./AdminHome.css";
import { Pie } from "react-chartjs-2";
var utilities = require("./Utilities.json");

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
          backgroundColor: ["#00af09", "#ffd000", "#b60000"]
        }
      ],
      filter: "graph",
      status: {
        GRAPH: "graph",
        ONESTAR: "onestar",
        TWOSTAR: "twostar",
        THREESTAR: "threestar"
      },
      dataCategory: {
        onestar: [],
        twostar: [],
        threestar: []
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
        adme: "ADME",
        aero: "AERO",
        ice: "ICE",
        nano: "NANO",
        robotic: "ROBOTIC",
      },
      comment: [],
    };
  }

  fetchData = () => {
    axios.get(utilities["backend-url"] + "/users").then(res => {
      const userDatas = res.data;
      var datasets = this.state.datasets;
      var dataCategory = this.state.dataCategory;
      var comment = this.state.comment;
      for (let i = 0; i < userDatas.length; i++) {
        var total = userDatas[i].sumScore;
        if (total < 13) {
          dataCategory.onestar.push(i);
        } else if (total < 19) {
          dataCategory.twostar.push(i);
        } else {
          dataCategory.threestar.push(i);
        }
        if(userDatas[i].comment !== ""){
          comment.push(userDatas[i].comment);
        }
      }
      datasets[0].data[0] = dataCategory.onestar.length;
      datasets[0].data[1] = dataCategory.twostar.length;
      datasets[0].data[2] = dataCategory.threestar.length;
      this.setState({ datasets: datasets });
      console.log(this.state.datasets[0].data);
      this.setState({ dataCategory: dataCategory });
      console.log(this.state.dataCategory);
      this.setState({ comment: comment });
      console.log(this.state.comment);
      this.setState({ userDatas: userDatas, isUserDataLoad: true });
      console.log(this.state.userDatas);
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
            onClick={e => this.filterHandler(e, this.state.status.GRAPH)}
          >
            <h5>Graph</h5>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-2"
            onClick={e => this.filterHandler(e, this.state.status.ONESTAR)}
          >
            <h5>One Star</h5>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-3"
            onClick={e => this.filterHandler(e, this.state.status.TWOSTAR)}
          >
            <h5>Two Star</h5>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-4"
            onClick={e => this.filterHandler(e, this.state.status.THREESTAR)}
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
          <td className="align-middle">
            <h5>ด้านการเรียน</h5>
          </td>
          <td className="align-middle">
            <h5>ด้านสุขภาพ</h5>
          </td>
          <td className="align-middle">
            <h5>ด้านครอบครัว</h5>
          </td>
          <td className="align-middle">
            <h5>ด้านอื่นๆ</h5>
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
        padding: 30
      }
    };
    var commentDisp = this.state.comment.map((com,idx)=>(
    <li><h5 key={idx}>{com}</h5></li>
    ));
    return (
      <Col className="text-center bg-white chart">
        <div className="mt-3">
        <Pie
          data={{
            labels: this.state.labels,
            datasets: this.state.datasets
          }}
          
          options={{ legend: options }}
        />
        </div>
        <h2 className="mt-5 text-left">ข้อเสนอแนะ</h2>
        <div className="mb-3 text-left">
          <ul>
            {commentDisp}
          </ul>
        </div>
      </Col>
    );
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
      default: idxList=this.state.dataCategory.onestar;
    }
    const data = idxList.map(id => (
      <tr className="text-left">
        <td className="align-middle">{this.state.userDatas[id].name}</td>
        <td className="align-middle">{this.state.userDatas[id].userId}</td>
        <td className="align-middle text-center">{this.state.major[this.state.userDatas[id].major]}</td>
        <td className="align-middle text-center">{this.state.userDatas[id].sumScore}</td>
        <td className="align-middle">{this.state.userDatas[id].helpStudy}</td>
        <td className="align-middle">{this.state.userDatas[id].helpHealth}</td>
        <td className="align-middle">{this.state.userDatas[id].helpFamily}</td>
        <td className="align-middle">{this.state.userDatas[id].helpOther}</td>
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
      return (
        <div className="main-bg text-center">
          <NavBar mode="admin" />
          <Spinner
            animation="grow"
            variant="warning"
            className="loading spinner"
          />
        </div>
      );
    }
    return (
      <div className="main-bg">
        <NavBar />
        <Container id="AdminHome-box">
          <Row className="mt-3">
            <Col className="text-center bg-white chart pt-3 mb-3">
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
