import React from "react";
import {connect} from "react-redux";
import {Card, Col} from 'antd';
import UIHealthBar from "./UIHealthBar";
import UIExpBar from "./UIExpBar";
import UIAttrBar from "./UIAttrBar";

class UIPlayerInfo extends React.Component {

  render() {
    return (
      <Col span={8}>
        <Card
          title={`人物信息 -- <${this.props.userName}>`}
        >
          <UIAttrBar/>
          <UIHealthBar/>
          <UIExpBar/>
        </Card>
      </Col>
    );
  }
}

export default connect((state, props) => {
  return {
    userName: state.player.name,
  };
})(UIPlayerInfo);
