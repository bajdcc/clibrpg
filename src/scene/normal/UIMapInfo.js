import React from "react";
import {connect} from "react-redux";
import {Card, Col} from 'antd';
import UIMapBar from "./UIMapBar";
import UIAnimalBar from "./UIAnimalBar";
import UIPeopleBar from "./UIPeopleBar";

class UIPlayerInfo extends React.Component {

  getMapName() {
    const {maping, map} = this.props;
    return map[maping][1];
  }

  render() {
    return (
      <Col span={8}>
        <Card
          title={`当前地图 -- <${this.getMapName()}>`}
        >
          <UIMapBar/>
          <UIPeopleBar/>
          <UIAnimalBar/>
        </Card>
      </Col>
    );
  }
}

export default connect((state, props) => {
  return {
    maping: state.player.maping,
    map: state.settings.map,
  };
})(UIPlayerInfo);
