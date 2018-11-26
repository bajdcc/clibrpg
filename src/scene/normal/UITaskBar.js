import React from "react";
import {connect} from "react-redux";
import _ from "lodash";
import {Button, Col, Popover, Progress, Row} from "antd";
import {taskType} from "./util";

class UITaskBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checkingID: setTimeout(this.checkingTimeout.bind(this), 1000),
    };
  }

  componentWillUnmount() {
    if (this.state.checkingID >= 0)
      clearTimeout(this.state.checkingID);
  }

  checkingTimeout() {
    if (this.props.player.useblood > 0) {
      this.setState({
        checkingID: setTimeout(this.checkingTimeout.bind(this), 1000)
      });
    }
  }

  taskTarget0(task) {
    const [id, num] = task[5];
    const ani = this.props.animal[id];
    return `打败<${num}>只<${ani[0]}>`;
  }

  taskTarget(task) {
    switch (task[0]) {
      case 0: return this.taskTarget0(task);
      default: break;
    }
    return "task: unknown target";
  }

  taskProgress0(roleData, task) {
    const {all, count} = roleData;
    return 100 * count / all;
  }

  taskProgress(roleData, task) {
    switch (task[0]) {
      case 0: return this.taskProgress0(task);
      default: break;
    }
    return "task: unknown progress";
  }

  taskInfo0(id, cur, task) {
    const {people, roleData} = this.props;
    const peo = people[id];
    const percent = this.taskProgress(roleData, task);
    const info = (
      <div>
        <Row><Col span={8}>人物：</Col><Col span={16}><b>{peo[1]} - {peo[2]}</b></Col></Row>
        <Row><Col span={8}>类型：</Col><Col span={16}><b>{taskType(task[0])}</b></Col></Row>
        <Row><Col span={8}>目标：</Col><Col span={16}><b>{this.taskTarget(task)}</b></Col></Row>
        <Row><Col span={8}>奖励：</Col><Col span={16}><b>&lt;${task[8]}&gt;金钱</b>和<b>&lt;{task[9]}&gt;经验</b></Col></Row>
        <Row><Col span={8}>进度：</Col><Col span={16}><Progress size="small" percent={percent} showInfo={false}/></Col></Row>
      </div>
    );
    return (
      <Popover key={`tasks_${id}_${cur}`} content={info} title={`任务 -- <${task[1]}>`}>
        <Button size={"small"}>
          {task[1]}
        </Button>
      </Popover>
    );
  }

  conv(id) {
    const {roleList, player} = this.props;
    const r = roleList[id];
    const cur = player.roles[id];
    const task = r[cur];
    switch (task[0]) {
      case 0: return this.taskInfo0(id, cur, task);
      default: break;
    }
    return "task: unknown type";
  }

  taskList() {
    const {role} = this.props;
    const list = _.chain(role)
      .map((a, idx) => [a, idx])
      .filter((a) => a[0])
      .map((a) => a[1])
      .map(this.conv.bind(this))
      .value();
    if (list.length === 0)
      return "无";
    return list;
  }

  render() {
    return (
      <Row>
        <Col span={6}>
          任务：
        </Col>
        <Col span={18}>
          {this.taskList()}
        </Col>
      </Row>
    );
  }
}

export default connect((state, props) => {
  return {
    player: state.player,
    role: state.player.role,
    roles: state.player.roles,
    roleData: state.player.roleData,
    roleList: state.settings.role,
    people: state.settings.people,
    animal: state.settings.animal,
  };
})(UITaskBar);
