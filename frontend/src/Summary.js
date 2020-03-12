import React,{Component} from 'react';
import NavBar from './NavBar';
import './Summary.css';
import { Container, Row, Col } from 'react-bootstrap';
import LocalStorageService from './LocalStorageService';

class Summary extends Component{
    constructor(props){
        super(props);
        this.state={
            score:LocalStorageService.getScore(),
        };
    }

    getSummary = () => {
        var text = "";
        var score = this.state.score;
        const label = "มีอาการของโรคซึมเศร้า";
        if(score < 7){
            text = <h4>ไม่{label} หรือ {label} ระดับน้อยมาก</h4>;
        } else if(score < 13){
            text = <h4>{label} ระดับน้อย</h4>;
        } else if(score < 19){
            text = <h4>{label} ระดับปานกลาง</h4>;
        } else {
            text = <h4>{label} ระดับรุนแรง</h4>;
        }
        return text;        
    }

    render(){
        var label = <h2>สรุปผลคะแนน</h2>;
        return(
            <div className="main-bg">
                <NavBar />
                <Container id="summary-box">
                    <Row>
                        <Col className="text-center">
                            {label}
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center mt-3">
                            {this.getSummary()}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
  
export default Summary;
