import React from "react";
import { connect } from "react-redux";

class NormalScene extends React.Component {

  render() {
    return (
      <h1>Normal Scene</h1>
    );
  }
}

export default connect((state, props) => {
  return {};
})(NormalScene);
