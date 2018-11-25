import React from "react";
import {connect} from "react-redux";
import {Col, Modal, Popover, Radio, Row, message} from 'antd';
import _ from 'lodash';
import {setPlayerValue} from "../../store/player-actions";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class UIPeopleBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: -1,
    };
  }

  onChange(e) {
    const id = e.target.value;
    const {role} = this.props.player;
    if (role >= 0) {
      message.error("你当前已有任务在身！");
      return null;
    }
    const r = this.props.role[id];
    const cur = this.props.player.roles[id];
    if (cur >= r.length) {
      message.warning("没有更多任务了！");
      return null;
    }
    this.setState({
      id: id,
      visible: true,
    });
  }

  handleOk() {
    setPlayerValue({
      role: this.state.id
    });
    this.setState({
      visible: false,
    });
  }

  handleCancel() {
    this.setState({
      id: -1,
      visible: false,
    });
  }

  talk() {
    if (this.state.id >= 0) {
      const r = this.props.role[this.state.id];
      const p = this.props.people[this.state.id];
      const cur = this.props.player.roles[this.state.id];
      if (cur >= r.length) {
        message.warning("没有更多任务了！");
        return null;
      }
      const task = r[cur];
      return (
        <Modal title={`与<${p[1]} - ${p[2]}>对话中 —— **${task[1]}**`}
               visible={this.state.visible}
               onOk={this.handleOk.bind(this)}
               onCancel={this.handleCancel.bind(this)}
               okText={task[3]}
               cancelText={task[4]}>
          <p>
            {task[2]}
          </p>
        </Modal>);
    }
    return null;
  }

  conv(id, txt) {
    return _(txt.split(/\n/)).map((a, idx) => <p key={`people_${id}_${idx}`}>{a}</p>).value();
  }

  render() {
    const {maping, map, people} = this.props;
    if (map[maping][4].length === 0)
      return null;
    const ids = _(map[maping][4]).map((id) => {
      const peo = people[id];
      return (
        <Popover key={`people_${id}`} content={this.conv(id, peo[4])} title={`<${peo[1]}> - <${peo[2]}>`}>
          <RadioButton value={id}>{peo[2]}</RadioButton>
        </Popover>
      )
    }).value();
    return (
      <div>
        <Row>
          <Col span={4}>
            NPC：
          </Col>
          <Col>
            <RadioGroup onChange={this.onChange.bind(this)}>
              {ids}
            </RadioGroup>
          </Col>
        </Row>
        {this.talk()}
      </div>
    );
  }
}

export default connect((state, props) => {
  return {
    maping: state.player.maping,
    player: state.player,
    map: state.settings.map,
    role: state.settings.role,
    people: state.settings.people,
  };
})(UIPeopleBar);
