import React from "react";
import {connect} from "react-redux";
import _ from "lodash";
import {Col, Row, Button, Popover, Progress} from "antd";
import {applyGoodEffect, goodTimes, goodTypes} from "./util";
import {setPlayerValue} from "../../store/player-actions";

class UIStateBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checkingID: setTimeout(this.checkingTimeout.bind(this), 1000),
      goodID: -1,
    };
  }

  componentWillUnmount() {
    if (this.state.goodID >= 0)
      clearTimeout(this.state.goodID);
    if (this.state.checkingID >= 0)
      clearTimeout(this.state.checkingID);
  }

  checkingTimeout() {
    if (this.props.player.useblood > 0) {
      if (this.props.states.good != null && this.props.states.good.obj != null && this.state.goodID === -1) {
        this.setState({
          goodID: setTimeout(this.goodTimeout.bind(this), 100)
        });
      }
      this.setState({
        checkingID: setTimeout(this.checkingTimeout.bind(this), 1000)
      });
    }
  }

  goodTimeout() {
    const {count, all, obj} = this.props.states.good;
    if (count % 100 === 0)
      applyGoodEffect(this.props.player, obj);
    setPlayerValue({
      states: {
        good: {
          obj: obj,
          count: count + 10,
          all: all,
        }
      }
    });
    if (count + 10 <= all) {
      this.setState({
        goodID: setTimeout(this.goodTimeout.bind(this), 100)
      });
    } else {
      this.setState({
        goodID: -1
      });
      setPlayerValue({
        states: {
          good: null
        }
      });
    }
  }

  goodState(id, s) {
    const good = s.obj;
    const t = goodTypes(good[1]);
    const percent = 100 * s.count / s.all;
    const info = (
      <div>
        <Row><Col span={8}>进度：</Col><Col span={16}><Progress size="small" percent={percent} width={80} showInfo={false}/></Col></Row>
        <Row><Col span={8}>类型：</Col><Col span={16}>{t}药水</Col></Row>
        <Row><Col span={8}>金钱：</Col><Col span={16}>{good[3]}</Col></Row>
        <Row><Col span={8}>效果：</Col><Col span={16}>{goodTimes(good[5])}增加{good[4]}{t}</Col></Row>
      </div>
    );
    return (
      <Popover key={`state_${id}`} content={info} title={`状态 -- <${good[2]}>`}>
        <Button>
          {good[2]}
        </Button>
      </Popover>
    );
  }

  conv(id) {
    const {states} = this.props;
    const s = states[id];
    if (s === null)
      return null;
    switch (id) {
      case "good":
        return this.goodState(id, s);
      default:
        break;
    }
    return null;
  }

  stateList() {
    const {states} = this.props;
    const list = _.keys(states).map(this.conv.bind(this)).filter((a) => a !== null);
    if (list.length === 0)
      return "无";
    return list;
  }

  render() {
    return (
      <Row>
        <Col span={6}>
          状态：
        </Col>
        <Col span={18}>
          {this.stateList()}
        </Col>
      </Row>
    );
  }
}

export default connect((state, props) => {
  return {
    player: state.player,
    states: state.player.states
  };
})(UIStateBar);
