import React from "react";
import {connect} from "react-redux";
import {Col, message, Popover, Radio, Row, Spin, Progress, Modal, Button, Input, Select, InputNumber, Slider} from 'antd';
import _ from 'lodash';
import {setPlayerValue} from "../../store/player-actions";
import {applyGoodEffect, goodTimes, goodTypes} from "./util";
import {setSettingsValue} from "../../store/settings-actions";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class UIGoodBar extends React.Component {

  constructor(props) {
    super(props);
    const {good} = this.props.player.states;
    if (good != null) {
      if (good.obj == null) {
        return;
      }
      const {obj, count, all} = good;
      this.state = {
        obj: obj,
        count: count,
        all: all,
        goodID: setTimeout(this.rec2.bind(this), 1000),
        editGoodId: -1,
        editGoodObject: null
      };
    } else {
      this.state = {
        hidden: false,
        obj: null,
        count: 0,
        all: 100,
        goodID: -1,
        editGoodId: -1,
        editGoodObject: null
      };
    }
  }

  componentWillUnmount() {
    if (this.state.goodID >= 0)
      clearTimeout(this.state.goodID);
  }

  rec1() {
    const {count, all} = this.state;
    this.setState({
      count: count + 10,
    });
    if (count <= all) {
      this.setState({
        goodID: setTimeout(this.rec1.bind(this), 100)
      });
    } else {
      this.setState({
        hidden: false,
        count: 0,
        all: 100,
      });
    }
  }

  rec2() {
    const {count, all} = this.state;
    this.setState({
      count: count + 10,
    });
    if (count + 10 <= all && this.props.player.useblood > 0) {
      this.setState({
        goodID: setTimeout(this.rec2.bind(this), 100)
      });
    } else {
      this.setState({
        hidden: false,
        count: 0,
        all: 100,
      });
    }
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
      this.setState({
        goodID: setTimeout(this.rec1.bind(this), 100)
      });
      applyGoodEffect(this.props.player, good);
      message.success(`${goodTypes(good[1])}增加${good[4]}！`);
    } else {
      this.setState({
        count: 0,
        all: 100 * good[5],
      });
      setPlayerValue({
        states: {
          good: {
            obj: good,
            count: 0,
            all: 100 * good[5],
          }
        }
      });
      this.setState({
        goodID: setTimeout(this.rec2.bind(this), 100)
      });
    }
  }

  editGood(id) {
    const {goods} = this.props;
    this.setState({
      editGoodId: id,
      editGoodObject: goods[id]
    });
  }

  handleGoodEditorOk() {
    const {goods} = this.props;
    const {editGoodId} = this.state;
    goods[editGoodId] = this.state.editGoodObject;
    setSettingsValue({
      goods: goods
    });
    this.setState({
      editGoodId: -1
    });
  }

  handleGoodEditorCancel() {
    this.setState({
      editGoodId: -1
    });
  }

  handleGoodEditorChange(type, e) {
    const {editGoodObject} = this.state;
    if (!e)
      return false;
    const newValue = e.target ? e.target.value : e;
    if (!newValue)
      return false;
    editGoodObject[type] = newValue;
    this.setState({
      editGoodObject: editGoodObject
    });
  }

  renderGoodEditor() {
    const {goods} = this.props;
    const {editGoodId} = this.state;
    const good = goods[editGoodId];
    return <div>
      <Modal title={`修改物品信息 -- ${good[2]}`}
             visible={true}
             onCancel={this.handleGoodEditorCancel.bind(this)}
             footer={[
               <Button key="submit" type="primary" onClick={this.handleGoodEditorOk.bind(this)}>
                 确定
               </Button>
             ]}>
        <div>
          <Row>
            <Col span={4}>名称：</Col>
            <Col span={8}>
              <Input placeholder="物品名称" defaultValue={good[2]}
                     onChange={this.handleGoodEditorChange.bind(this, 2)}/>
            </Col>
          </Row>
          <Row>
            <Col span={4}>类别：</Col>
            <Col span={8}>
              <Select defaultValue={good[1]} style={{ width: 120 }} onChange={this.handleGoodEditorChange.bind(this, 1)}>
                <Option value={0}>生命</Option>
                <Option value={1}>经验</Option>
                <Option value={2} disabled>任务</Option>
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={4}>金钱：</Col>
            <Col span={4}>
              <InputNumber placeholder="物品金钱"
                           min={1} max={1000}
                           value={this.state.editGoodObject[3]}
                           onChange={this.handleGoodEditorChange.bind(this, 3)}/>
            </Col>
            <Col span={8} offset={2}>
              <Slider
                min={1} max={1000}
                onChange={this.handleGoodEditorChange.bind(this, 3)}
                value={this.state.editGoodObject[3]}
              />
            </Col>
          </Row>
          <Row>
            <Col span={4}>效果：</Col>
            <Col span={4}>
              <InputNumber placeholder="物品增益"
                           min={1} max={1000}
                           value={this.state.editGoodObject[4]}
                           onChange={this.handleGoodEditorChange.bind(this, 4)}/>
            </Col>
            <Col span={8} offset={2}>
              <Slider
                min={1} max={1000}
                onChange={this.handleGoodEditorChange.bind(this, 4)}
                value={this.state.editGoodObject[4]}
              />
            </Col>
          </Row>
          <Row>
            <Col span={4}>时间：</Col>
            <Col span={4}>
              <InputNumber placeholder="物品时间"
                           min={0} max={600}
                           value={this.state.editGoodObject[5]}
                           onChange={this.handleGoodEditorChange.bind(this, 5)}/>
            </Col>
            <Col span={8} offset={2}>
              <Slider
                min={0} max={600}
                onChange={this.handleGoodEditorChange.bind(this, 5)}
                value={this.state.editGoodObject[5]}
              />
            </Col>
          </Row>
        </div>
      </Modal>
    </div>;
  }

  conv(good) {
    const t = goodTypes(good[1]);
    return (
      <div>
        <Row><Col span={8}>类型：</Col><Col span={16}>{t}药水</Col></Row>
        <Row><Col span={8}>金钱：</Col><Col span={16}>{good[3]}</Col></Row>
        <Row><Col span={8}>效果：</Col><Col span={16}>{goodTimes(good[5])}增加{good[4]}{t}</Col></Row>
        <hr/>
        <Row><Col span={8}><Button size={"small"}
                                   onClick={this.editGood.bind(this, good[0])}>修改物品信息</Button></Col></Row>
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
          <RadioButton key={`good_${id}`} disabled={true} value={id}>{good[2]}</RadioButton>
          :
          <Popover key={`good_${id}`} content={this.conv(good)} title={`物品信息 -- <${good[2]}>`}>
            <RadioButton value={id}>{good[2]}</RadioButton>
          </Popover>
      )
    }).value();
    if (this.state.hidden) {
      return <Row>
        <Col>
          <Progress percent={100 * this.state.count / this.state.all}
                    status="active"
                    showInfo={false}/>
        </Col>
        <br/>
        <Col>
          <Spin/>&emsp;准备中...
        </Col>
      </Row>;
    }
    return (
      <div>
        <Row>
          <Col>
            <RadioGroup onChange={this.onChange.bind(this)}>
              {ids}
            </RadioGroup>
          </Col>
        </Row>
        {
          this.state.editGoodId >= 0 ? this.renderGoodEditor() : null
        }
      </div>
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
