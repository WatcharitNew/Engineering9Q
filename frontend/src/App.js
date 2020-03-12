import React,{Component} from 'react';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Home from './Home';
import Question from './Question';
import Summary from './Summary';
import Instruction from './Instruction';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render(){
    return(
      <Router>
        <Switch>
          <Route exact path="/" component={()=><Home />} />
          <Route path="/instruction" component={()=><Instruction />} />
          <Route path="/question" component={()=><Question />} />
          <Route path="/summary" component={()=><Summary />} />
        </Switch>
    </Router>
    );
  }
}

export default App;
