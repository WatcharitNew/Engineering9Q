import React, { Component } from "react";
import { Spinner } from "react-bootstrap";

class LoadSpinner extends Component {
  render() {
    return (
      <div className="main-bg text-center">
        <Spinner
          animation="border"
          variant="warning"
          className="loading spinner"
        />
      </div>
    );
  }
}

export default LoadSpinner;
