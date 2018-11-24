import React from "react";
import {connect} from "react-redux";
import {Row, Col} from 'antd';

class UIAttrBar extends React.Component {

  render() {
    const {level, money, att, def} = this.props;
    return (
      <div>
        <Row>
          <Col span={6}>
            等级：
          </Col>
          <Col span={18}>
            {level}
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            金钱：
          </Col>
          <Col span={18}>
            ${money}
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            攻击：
          </Col>
          <Col span={18}>
            {att}
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            防御：
          </Col>
          <Col span={18}>
            {def}
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect((state, props) => {
  return {
    level: state.player.level,
    money: state.player.money,
    att: state.player.att,
    def: state.player.def,
  };
})(UIAttrBar);
