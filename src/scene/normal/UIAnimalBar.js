import React from "react";
import {connect} from "react-redux";
import {Col, Popover, Radio, Row} from 'antd';
import _ from 'lodash';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class UIAnimalBar extends React.Component {

  onChange(e) {
  }

  info(id) {
    const {animal} = this.props;
    const ani = animal[id];
    return (
      <div>
        <Row><Col span={8}>属性：</Col><Col span={16}>{ani[1]}级{ani[9]}系</Col></Row>
        <Row><Col span={8}>攻击：</Col><Col span={16}>{ani[3]}</Col></Row>
        <Row><Col span={8}>防御：</Col><Col span={16}>{ani[4]}</Col></Row>
        <Row><Col span={8}>生命：</Col><Col span={16}>{ani[2]}</Col></Row>
        <Row><Col span={8}>金钱：</Col><Col span={16}>{ani[5]}</Col></Row>
        <Row><Col span={8}>经验：</Col><Col span={16}>{ani[6]}</Col></Row>
        <Row><Col span={8}>魔法：</Col><Col span={16}>{ani[7]}秒{ani[8]}伤害</Col></Row>
      </div>);
  }

  render() {
    const {maping, map, animal} = this.props;
    if (map[maping][3].length === 0)
      return null;
    const ids = _(map[maping][3]).map((id) => {
      const ani = animal[id];
      return (
        <Popover key={id} content={this.info(id)} title={`怪物信息 - <${ani[0]}>`}>
          <RadioButton value={id}>{ani[0]}</RadioButton>
        </Popover>
      )
    }).value();
    return (
      <div>
        <Row>
          <Col>
            怪物：
          </Col>
        </Row>
        <Row>
          <Col>
            <RadioGroup onChange={this.onChange.bind(this)}>
              {ids}
            </RadioGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect((state, props) => {
  return {
    maping: state.player.maping,
    map: state.settings.map,
    animal: state.settings.animal,
  };
})(UIAnimalBar);
