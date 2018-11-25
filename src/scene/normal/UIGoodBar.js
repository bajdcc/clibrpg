import React from "react";
import {connect} from "react-redux";
import {Col, message, Popover, Radio, Row, Spin, Progress} from 'antd';
import _ from 'lodash';
import {setPlayerValue} from "../../store/player-actions";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class UIGoodBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      hidden: false,
      count: 0,
      all: 100,
    };
  }


  onChange(e) {
    const {money, goods} = this.props;
    const id = e.target.value;
    const good = goods[id];
    this.setState({
      checked: false,
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
      message.success(`${this.types(good[1])}增加${good[4]}！`);
    } else {
      this.setState({
        all: 100 * good[5],
      });
      setTimeout(() => {
        this.setState({
          hidden: false,
          count: 0,
          all: 100,
        });
      }, good[5] * 1000);
      setTimeout(function rec() {
        const {count, all} = this.state;
        this.setState({
          count: count + 10,
        });
        if (count <= all) {
          setTimeout(rec.bind(this), 100);
        }
      }.bind(this), 100);
      this.addGoodState(good);
    }
  }

  addGoodState(good) {

  }

  types(id) {
    switch (id) {
      case 0:
        return "生命";
      case 1:
        return "经验";
      default:
        break;
    }
    return "good: unknown id";
  }

  times(id) {
    if (id === 0)
      return "立即";
    return `${id}秒内`;
  }

  conv(good) {
    const t = this.types(good[1]);
    return (
      <div>
        <Row><Col span={8}>类型：</Col><Col span={16}>{t}药水</Col></Row>
        <Row><Col span={8}>金钱：</Col><Col span={16}>{good[3]}</Col></Row>
        <Row><Col span={8}>效果：</Col><Col span={16}>{this.times(good[5])}增加{good[4]}{t}</Col></Row>
      </div>);
  }

  render() {
    const {money, goods} = this.props;
    const min = _.chain(goods).map((a) => a[3]).min();
    if (goods.length === 0)
      return null;
    const ids = _(goods).map((good) => {
      const id = good[0];
      return (
        <Popover key={id} content={this.conv(good)} title={`物品信息 -- <${good[2]}>`}>
          {
            money < good[3] ? null : <RadioButton checked={this.state.checked} value={id}>{good[2]}</RadioButton>
          }
        </Popover>
      )
    }).value();
    if (this.state.hidden) {
      return <Row><Col><Progress percent={100 * this.state.count / this.state.all} status="active"/></Col><br/><Col><Spin/>&emsp;商店准备中……</Col></Row>;
    }
    return money < min ? <Row><Col>暂无物品！</Col></Row> : (
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
    money: state.player.money,
    goods: state.settings.goods,
  };
})(UIGoodBar);
