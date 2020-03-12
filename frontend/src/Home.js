import React,{Component} from 'react';
import './Home.css';
import NavBar from './NavBar';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import LocalStorageService from './LocalStorageService';

class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            name: "",
            id: "",
        };
    }

    submit = () => {
        LocalStorageService.setUserName(this.state.name);
        LocalStorageService.setUserID(this.state.id);
    }

    render(){
        return(
            <div className="main-bg">
                <NavBar />
                <Container id="home-box">
                    <Row>
                        <Col className="text-center">
                            <h1 className="text-white">แบบประเมิณ 9Q</h1>
                        </Col>
                    </Row>
                    <Row className="mt-5 mb-1">
                        <Col xs={2}></Col>
                        <Col xs={3} className="text-right">
                            <Form.Label><h4 className="text-white">ชื่อ-นามสกุล</h4></Form.Label>
                        </Col >
                        <Col xs={5} className="text-left">
                            <Form.Control type="text" placeholder="ชื่อ นามสกุล" required onChange={(e)=>{this.setState({name: e.target.value})}} value={this.state.name}/>
                        </Col>
                    </Row>
                    <Row className="mt-1 mb-5">
                        <Col xs={2}></Col>
                        <Col xs={3} className="text-right">
                            <Form.Label><h4 className="text-white">รหัสนิสิต</h4></Form.Label>
                        </Col >
                        <Col xs={3} className="text-left">
                            <Form.Control type="text" placeholder="xxxxxxxx21" required onChange={(e)=>{this.setState({id: e.target.value})}} value={this.state.id}/>
                        </Col>
                        <Col xs={2}></Col>
                    </Row>
                    <Row>
                        <Col className="text-center" >
                            <Button id="begin-button" type="submit" href="/question" onClick={()=>{this.submit()}}>
                                เริ่มทำแบบทดสอบ
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
  
export default Home;
