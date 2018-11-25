import React from "react";
import {connect} from "react-redux";
import {Col, message, Popover, Radio, Row, Spin, Progress} from 'antd';
import _ from 'lodash';
import {setPlayerValue} from "../../store/player-actions";
import {applyGoodEffect, goodTimes, goodTypes} from "./util";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class UIGoodBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
      obj: null,
      count: 0,
      all: 100,
    };
  }

  onChange(e) {
    const {money, goods} = this.props;
    const id = e.target.value;
    const good = goods[id];
    this.setState({
      hidden: true,
    });
    if (money < good[3])
      return;
    setPlayerValue({
      money: money - good[3]
    });
    message.success(`购买<${good[2]}>成功！`);
    if (good[5] === 0) {
      setTimeout(() => {
        this.setState({
          hidden: false,
          count: 0,
          all: 100,
        });
      }, 1000);
      setTimeout(function rec() {
        const {count, all} = this.state;
        this.setState({
          count: count + 10,
        });
        if (count <= all) {
          setTimeout(rec.bind(this), 100);
        }
      }.bind(this), 100);
      message.success(`${goodTypes(good[1])}增加${good[4]}！`);
    } else {
      this.setState({
        obj: good,
        count: 0,
        all: 100 * good[5],
      });
      setTimeout(function rec() {
        const {count, all} = this.state;
        this.setState({
          count: count + 10,
        });
        if (count % 100 === 0)
          applyGoodEffect(this.props.player, this.state.obj);
        setPlayerValue({
          states: {
            good: {
              obj: this.state.obj,
              all: this.state.all,
              count: this.state.count,
            }
          }
        });
        if (count <= all) {
          setTimeout(rec.bind(this), 100);
        } else {
          this.setState({
            hidden: false,
            count: 0,
            all: 100,
          });
          setPlayerValue({
            states: {
              good: null
            }
          });
        }
      }.bind(this), 100);
    }
  }

  conv(good) {
    const t = goodTypes(good[1]);
    return (
      <div>
        <Row><Col span={8}>类型：</Col><Col span={16}>{t}药水</Col></Row>
        <Row><Col span={8}>金钱：</Col><Col span={16}>{good[3]}</Col></Row>
        <Row><Col span={8}>效果：</Col><Col span={16}>{goodTimes(good[5])}增加{good[4]}{t}</Col></Row>
      </div>);
  }

  render() {
    const {money, goods} = this.props;
    if (goods.length === 0)
      return null;
    const ids = _(goods).map((good) => {
      const id = good[0];
      return (
        money < good[3] ?
          <RadioButton disabled={true} value={id}>{good[2]}</RadioButton>
          :
          <Popover key={id} content={this.conv(good)} title={`物品信息 -- <${good[2]}>`}>
            <RadioButton value={id}>{good[2]}</RadioButton>
          </Popover>
      )
    }).value();
    if (this.state.hidden) {
      return <Row><Col><Progress percent={100 * this.state.count / this.state.all}
                                 status="active"/></Col><br/><Col><Spin/>&emsp;准备中...</Col></Row>;
    }
    return (
      <Row>
        <Col>
          <RadioGroup onChange={this.onChange.bind(this)}>
            {ids}
          </RadioGroup>
        </Col>
      </Row>
    );
  }
}

export default connect((state, props) => {
  return {
    player: state.player,
    money: state.player.money,
    goods: state.settings.goods,
  };
})(UIGoodBar);
