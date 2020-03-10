import React,{Component} from 'react';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Home from './Home';
import Question from './Question';

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
          <Route path="/question" component={()=><Question />} />
        </Switch>
    </Router>
    );
  }
}

export default App;
