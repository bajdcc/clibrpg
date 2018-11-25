import React from "react";
import {connect} from "react-redux";
import {Card, Col} from 'antd';

class UIFightInfo extends React.Component {

  render() {
    return (
      <Col span={8}>
        <Card
          title={`当前怪物 -- `}
          style={{height: "300px"}}
        >
        </Card>
      </Col>
    );
  }
}

export default connect((state, props) => {
  return {
  };
})(UIFightInfo);
