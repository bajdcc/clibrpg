import React from "react";
import {connect} from "react-redux";
import {Card, Col} from 'antd';
import UIHealthBar from "./UIHealthBar";
import UIExpBar from "./UIExpBar";
import UIAttrBar from "./UIAttrBar";
import UIStateBar from "./UIStateBar";

class UIPlayerInfo extends React.Component {

  render() {
    return (
      <Col span={8}>
        <Card
          title={`人物信息 -- <${this.props.userName}>`}
          style={{height: "300px"}}
        >
          <UIAttrBar/>
          <UIHealthBar/>
          <UIExpBar/>
          <UIStateBar/>
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
