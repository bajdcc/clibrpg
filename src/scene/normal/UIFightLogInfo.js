import React from "react";
import {connect} from "react-redux";
import {Card, Col, Timeline} from 'antd';
import _ from "lodash";

class UIFightLogInfo extends React.Component {

  fightColor(id) {
    switch (id) {
      case 0:
        return "green";
      case 1:
        return "blue";
      case 2:
        return "red";
      default:
        break;
    }
    return "blue";
  }

  fightList() {
    const {fightL} = this.props;
    return _.chain(fightL).map((a, idx) =>
      <Timeline.Item key={`fight_${idx}`} color={this.fightColor(a[0])}>
        {a[1]}
      </Timeline.Item>
    ).value();
  }

  render() {
    return (
      <Col span={8}>
        <Card
          title={`战斗情况`}
          style={{height: "300px"}}
        >
          <Timeline>
            {this.fightList()}
          </Timeline>
        </Card>
      </Col>
    );
  }
}

export default connect((state, props) => {
  return {
    fightL: state.player.fightL,
  };
})(UIFightLogInfo);
