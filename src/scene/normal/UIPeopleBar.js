import React from "react";
import {connect} from "react-redux";
import {Col, Modal, Popover, Radio, Row, message, Progress} from 'antd';
import _ from 'lodash';
import {setPlayerValue} from "../../store/player-actions";
import {taskType} from "./util";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class UIPeopleBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: -1,
      hidden: false,
      count: 0,
      hiddenID: -1,
    };
  }

  componentWillUnmount() {
    if (this.state.hiddenID >= 0)
      clearTimeout(this.state.hiddenID);
  }

  onChange(e) {
    const id = e.target.value;
    const {role} = this.props.player;
    if (role[id]) {
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

  reloading() {
    if (this.state.count < 100) {
      this.setState({
        count: this.state.count + 10,
        hidden: true,
        hiddenID: setTimeout(this.reloading.bind(this), 100),
      });
    } else {
      this.setState({
        hidden: false,
        count: 0,
        hiddenID: -1,
      });
    }
  }

  reload() {
    this.setState({
      hidden: true,
      hiddenID: setTimeout(this.reloading.bind(this), 100),
    });
  }

  initTask0(task) {
    return {
      type: 0,
      id: task[5][0],
      all: task[5][1],
      count: 0,
    };
  }

  initTask(id, task) {
    switch (task[0]) {
      case 0: return this.initTask0(task);
      default: break;
    }
    return null;
  }

  initTaskData(id, task) {
    const {roleData} = this.props;
    roleData[id] = this.initTask(id, task);
    return roleData;
  }

  handleTask() {
    const {id} = this.state;
    const r = this.props.role[id];
    const cur = this.props.player.roles[id];
    const task = r[cur];
    const role = this.props.player.role;
    role[id] = true;
    setPlayerValue({
      role: role,
      roleData: this.initTaskData(id, task)
    });
  }

  handleOk() {
    this.handleTask();
    this.setState({
      visible: false,
    });
    this.reload();
  }

  handleCancel() {
    this.setState({
      id: -1,
      visible: false,
    });
    this.reload();
  }

  taskInfo0(task) {
    const [id, num] = task[5];
    const ani = this.props.animal[id];
    return `打败<${num}>只<${ani[0]}>`;
  }

  taskInfo(task) {
    switch (task[0]) {
      case 0: return this.taskInfo0(task);
      default: break;
    }
    return "task: unknown info";
  }

  talk() {
    if (this.state.id >= 0) {
      const {role, people, player} = this.props;
      const r = role[this.state.id];
      const p = people[this.state.id];
      const cur = player.roles[this.state.id];
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
          <br/>
          <br/>
          <br/>
          <hr/>
          <p>
            任务类型：<b>{taskType(task[0])}</b>
          </p>
          <p>
            任务目标：<b>{this.taskInfo(task)}</b>
          </p>
          <p>
            任务奖励：<b>&lt;${task[8]}&gt;金钱</b>和<b>&lt;{task[9]}&gt;经验</b>
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
            {
              this.state.hidden ? <Row>
                  <Col span={8}>
                    准备中...
                  </Col>
                  <Col span={8}>
                    <Progress percent={this.state.count}
                              status="active"
                              showInfo={false}
                    />
                  </Col>
                </Row>
                :
                <RadioGroup onChange={this.onChange.bind(this)}>
                  {ids}
                </RadioGroup>
            }
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
    roleData: state.player.roleData,
    map: state.settings.map,
    role: state.settings.role,
    animal: state.settings.animal,
    people: state.settings.people,
  };
})(UIPeopleBar);
