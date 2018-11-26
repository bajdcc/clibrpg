import React from "react";
import {connect} from "react-redux";
import _ from "lodash";
import {Button, Col, message, Popover, Progress, Row} from "antd";
import {taskType} from "./util";
import {setPlayerValue} from "../../store/player-actions";

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

  completeTask0(id) {
    const {roleList, player, role, roles, money, exping} = this.props;
    const r = roleList[id];
    const cur = player.roles[id];
    const task = r[cur];
    const logs = [
      `<${player.name}>完成了<${task[1]}>任务！`,
      `<${player.name}>获得了<$${task[8]}金钱>和<${task[9]}经验>！`
    ];
    message.success(logs[0]);
    message.success(logs[1]);
    role[id] = false;
    roles[id]++;
    setPlayerValue({
      money: money + task[8],
      exping: exping + task[9],
      role: role,
      roles: roles
    });
  }

  checkTask0Info(task) {
    const {id, count} = task;
    const {roleData} = this.props;
    for (let i in roleData) {
      const r = roleData[i];
      if (r.type === 0 && r.id === id) {
        roleData[i].count = count + r.count;
        if (roleData[i].count >= r.all) {
          roleData[i] = {type: -1};
          this.completeTask0(i);
          return;
        }
      }
    }
    setPlayerValue({
      roleData: roleData
    });
  }

  checkTask0() {
    const {winN} = this.props;
    if (winN.length > 0) {
      _(winN).forEach(this.checkTask0Info.bind(this));
      setTimeout(() => setPlayerValue({
        winN: []
      }), 0);
    }
  }

  checkTask() {
    this.checkTask0();
  }

  checkingTimeout() {
    if (this.props.player.useblood > 0) {
      this.checkTask();
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
      case 0:
        return this.taskTarget0(task);
      default:
        break;
    }
    return "task: unknown target";
  }

  taskProgress0(role, task) {
    const {all, count} = role;
    return Math.floor(100 * count / all);
  }

  taskProgress(role, task) {
    switch (task[0]) {
      case 0:
        return this.taskProgress0(role, task);
      default:
        break;
    }
    return "task: unknown progress";
  }

  taskInfo0(id, cur, task) {
    const {people, roleData} = this.props;
    const peo = people[id];
    const percent = this.taskProgress(roleData[id], task);
    const info = (
      <div>
        <Row><Col span={8}>人物：</Col><Col span={16}><b>{peo[1]} - {peo[2]}</b></Col></Row>
        <Row><Col span={8}>类型：</Col><Col span={16}><b>{taskType(task[0])}</b></Col></Row>
        <Row><Col span={8}>目标：</Col><Col span={16}><b>{this.taskTarget(task)}</b></Col></Row>
        <Row><Col span={8}>奖励：</Col><Col span={16}><b>&lt;${task[8]}&gt;金钱</b><br/><b>&lt;{task[9]}&gt;经验</b></Col></Row>
        <Row><Col span={8}>进度：</Col><Col span={16}><Progress type="circle" size="small" percent={percent} width={40}/></Col></Row>
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
      case 0:
        return this.taskInfo0(id, cur, task);
      default:
        break;
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
    money: state.player.money,
    exping: state.player.exping,
    winN: state.player.winN,
    role: state.player.role,
    roles: state.player.roles,
    roleData: state.player.roleData,
    roleList: state.settings.role,
    people: state.settings.people,
    animal: state.settings.animal,
  };
})(UITaskBar);
