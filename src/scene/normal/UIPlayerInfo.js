import React from "react";
import {connect} from "react-redux";
import {Card, Col, Row} from 'antd';
import UIHealthBar from "./UIHealthBar";
import UIExpBar from "./UIExpBar";

class UIPlayerInfo extends React.Component {

  render() {
    return (
      <Row>
        <Col span={6}>
          <Card
            title={`人物信息 -- <${this.props.userName}>`}
          >
            <UIHealthBar/>
            <UIExpBar/>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default connect((state, props) => {
  return {
    userName: state.player.name,
  };
})(UIPlayerInfo);
