import React from "react";
import {connect} from "react-redux";
import {Card, Col} from 'antd';
import UIFightBar from "./UIFightBar";

class UIFightInfo extends React.Component {

  render() {
    const {fightA, animal} = this.props;
    const ani = animal[fightA];
    return (
      <Col span={8}>
        <Card
          title={`怪物信息 -- <${ani[0]}>`}
          style={{height: "300px"}}
        >
          <UIFightBar/>
        </Card>
      </Col>
    );
  }
}

export default connect((state, props) => {
  return {
    fightA: state.player.fightA,
    animal: state.settings.animal,
  };
})(UIFightInfo);
