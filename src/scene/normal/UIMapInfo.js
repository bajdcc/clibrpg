import React from "react";
import {connect} from "react-redux";
import {Card, Col, Row} from 'antd';
import UIHealthBar from "./UIHealthBar";
import UIExpBar from "./UIExpBar";
import UIAttrBar from "./UIAttrBar";
import UIMapBar from "./UIMapBar";
import UIAnimalBar from "./UIAnimalBar";

class UIPlayerInfo extends React.Component {

  getMapName() {
    const {maping, map} = this.props;
    return map[maping][1];
  }

  render() {
    return (
      <Col span={6}>
        <Card
          title={`当前地图 -- <${this.getMapName()}>`}
        >
          <UIMapBar/>
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
