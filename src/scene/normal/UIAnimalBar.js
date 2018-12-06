import React from "react";
import {connect} from "react-redux";
import {Button, Modal, Input, Col, Popover, Radio, Row, InputNumber, Slider} from 'antd';
import _ from 'lodash';
import {setPlayerValue} from "../../store/player-actions";
import {setSettingsValue} from "../../store/settings-actions";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class UIAnimalBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editAnimalId: -1,
      editAnimalObject: null
    };
  }


  onChange(e) {
    const id = e.target.value;
    setPlayerValue({
      fightN: true,
      fightA: id,
    });
  }

  editAnimal(id) {
    const {animal} = this.props;
    this.setState({
      editAnimalId: id,
      editAnimalObject: animal[id]
    });
  }

  handleAnimalEditorOk() {
    const {animal} = this.props;
    const {editAnimalId} = this.state;
    animal[editAnimalId] = this.state.editAnimalObject;
    setSettingsValue({
      animal: animal
    });
    this.setState({
      editAnimalId: -1
    });
  }

  handleAnimalEditorCancel() {
    this.setState({
      editAnimalId: -1
    });
  }

  handleAnimalEditorChange(type, e) {
    const {editAnimalObject} = this.state;
    if (!e)
      return false;
    const newValue = e.target ? e.target.value : e;
    if (!newValue)
      return false;
    editAnimalObject[type] = newValue;
    this.setState({
      editAnimalObject: editAnimalObject
    });
  }

  renderAnimalEditor() {
    const {animal} = this.props;
    const {editAnimalId} = this.state;
    const ani = animal[editAnimalId];
    return <div>
      <Modal title={`修改怪物信息 -- ${ani[0]}`}
             visible={true}
             onCancel={this.handleAnimalEditorCancel.bind(this)}
             footer={[
               <Button key="submit" type="primary" onClick={this.handleAnimalEditorOk.bind(this)}>
                 确定
               </Button>
             ]}
      >
        <div>
          <Row>
            <Col span={4}>名称：</Col>
            <Col span={8}>
              <Input placeholder="怪物名称" defaultValue={ani[0]}
                     onChange={this.handleAnimalEditorChange.bind(this, 0)}/>
            </Col>
          </Row>
          <Row>
            <Col span={4}>等级：</Col>
            <Col span={8}>
              <InputNumber placeholder="怪物等级" defaultValue={ani[1]}
                           min={1} max={100}
                           onChange={this.handleAnimalEditorChange.bind(this, 1)}/>
            </Col>
          </Row>
          <Row>
            <Col span={4}>属性：</Col>
            <Col span={8}>
              <Input placeholder="怪物属性" defaultValue={ani[9]}
                     onChange={this.handleAnimalEditorChange.bind(this, 9)}
                     addonAfter="系"/>
            </Col>
          </Row>
          <Row>
            <Col span={4}>攻击：</Col>
            <Col span={4}>
              <InputNumber placeholder="怪物攻击"
                           min={1} max={ani[1] * 10}
                           value={this.state.editAnimalObject[3]}
                           onChange={this.handleAnimalEditorChange.bind(this, 3)}/>
            </Col>
            <Col span={8} offset={2}>
              <Slider
                min={1} max={ani[1] * 10}
                onChange={this.handleAnimalEditorChange.bind(this, 3)}
                value={this.state.editAnimalObject[3]}
              />
            </Col>
          </Row>
          <Row>
            <Col span={4}>防御：</Col>
            <Col span={4}>
              <InputNumber placeholder="怪物防御"
                           min={1} max={ani[1] * 10}
                           value={this.state.editAnimalObject[4]}
                           onChange={this.handleAnimalEditorChange.bind(this, 4)}/>
            </Col>
            <Col span={8} offset={2}>
              <Slider
                min={1} max={ani[1] * 10}
                onChange={this.handleAnimalEditorChange.bind(this, 4)}
                value={this.state.editAnimalObject[4]}
              />
            </Col>
          </Row>
          <Row>
            <Col span={4}>生命：</Col>
            <Col span={4}>
              <InputNumber placeholder="怪物生命"
                           min={1} max={ani[9] === 'BOSS' ? (ani[1] * 50) : ani[1] * 10}
                           value={this.state.editAnimalObject[2]}
                           onChange={this.handleAnimalEditorChange.bind(this, 2)}/>
            </Col>
            <Col span={8} offset={2}>
              <Slider
                min={1} max={ani[9] === 'BOSS' ? (ani[1] * 50) : ani[1] * 10}
                onChange={this.handleAnimalEditorChange.bind(this, 2)}
                value={this.state.editAnimalObject[2]}
              />
            </Col>
          </Row>
          <Row>
            <Col span={4}>金钱：</Col>
            <Col span={4}>
              <InputNumber placeholder="怪物金钱"
                           min={1} max={ani[9] === 'BOSS' ? (ani[1] * 50) : ani[1] * 10}
                           value={this.state.editAnimalObject[5]}
                           onChange={this.handleAnimalEditorChange.bind(this, 5)}/>
            </Col>
            <Col span={8} offset={2}>
              <Slider
                min={1} max={ani[9] === 'BOSS' ? (ani[1] * 50) : ani[1] * 10}
                onChange={this.handleAnimalEditorChange.bind(this, 5)}
                value={this.state.editAnimalObject[5]}
              />
            </Col>
          </Row>
          <Row>
            <Col span={4}>经验：</Col>
            <Col span={4}>
              <InputNumber placeholder="怪物经验"
                           min={1} max={ani[9] === 'BOSS' ? (ani[1] * 20) : ani[1] * 10}
                           value={this.state.editAnimalObject[6]}
                           onChange={this.handleAnimalEditorChange.bind(this, 6)}/>
            </Col>
            <Col span={8} offset={2}>
              <Slider
                min={1} max={ani[9] === 'BOSS' ? (ani[1] * 20) : ani[1] * 10}
                onChange={this.handleAnimalEditorChange.bind(this, 6)}
                value={this.state.editAnimalObject[6]}
              />
            </Col>
          </Row>
          <Row>
            <Col span={4}>魔法：</Col>
            <Col span={4}>
              <InputNumber placeholder="怪物魔法"
                           min={1} max={ani[9] === 'BOSS' ? (ani[1] * 20) : ani[1] * 10}
                           value={this.state.editAnimalObject[8]}
                           onChange={this.handleAnimalEditorChange.bind(this, 8)}/>
            </Col>
            <Col span={8} offset={2}>
              <Slider
                min={1} max={ani[9] === 'BOSS' ? (ani[1] * 20) : ani[1] * 10}
                onChange={this.handleAnimalEditorChange.bind(this, 8)}
                value={this.state.editAnimalObject[8]}
              />
            </Col>
          </Row>
          <Row>
            <Col span={4}>魔法时间：</Col>
            <Col span={4}>
              <InputNumber placeholder="怪物魔法时间"
                           min={1} max={ani[9] === 'BOSS' ? (ani[1] * 10) : ani[1] * 10}
                           value={this.state.editAnimalObject[7]}
                           onChange={this.handleAnimalEditorChange.bind(this, 7)}/>
            </Col>
            <Col span={8} offset={2}>
              <Slider
                min={1} max={ani[9] === 'BOSS' ? (ani[1] * 10) : ani[1] * 10}
                onChange={this.handleAnimalEditorChange.bind(this, 7)}
                value={this.state.editAnimalObject[7]}
              />
            </Col>
          </Row>
        </div>
      </Modal>
    </div>;
  }

  info(id) {
    const {animal} = this.props;
    const ani = animal[id];
    return (
      <div>
        <Row><Col span={8}>属性：</Col><Col span={16}>{ani[1]}级-{ani[9]}系</Col></Row>
        <Row><Col span={8}>攻击：</Col><Col span={16}>{ani[3]}</Col></Row>
        <Row><Col span={8}>防御：</Col><Col span={16}>{ani[4]}</Col></Row>
        <Row><Col span={8}>生命：</Col><Col span={16}>{ani[2]}</Col></Row>
        <Row><Col span={8}>金钱：</Col><Col span={16}>{ani[5]}</Col></Row>
        <Row><Col span={8}>经验：</Col><Col span={16}>{ani[6]}</Col></Row>
        <Row><Col span={8}>魔法：</Col><Col span={16}>{ani[7]}秒{ani[8]}伤害</Col></Row>
        <hr/>
        <Row><Col span={8}><Button size={"small"} onClick={this.editAnimal.bind(this, id)}>修改怪物信息</Button></Col></Row>
      </div>);
  }

  render() {
    const {maping, map, animal} = this.props;
    if (map[maping][3].length === 0)
      return null;
    const ids = _(map[maping][3]).map((id) => {
      const ani = animal[id];
      return (
        <Popover key={`animal_${id}`} content={this.info(id)} title={`怪物信息 - <${ani[0]}>`}>
          <RadioButton value={id}>{ani[0]}</RadioButton>
        </Popover>
      )
    }).value();
    return (
      <div>
        <Row>
          <Col span={4}>
            怪物：
          </Col>
          <Col>
            <RadioGroup onChange={this.onChange.bind(this)}>
              {ids}
            </RadioGroup>
          </Col>
        </Row>
        {
          this.state.editAnimalId >= 0 ? this.renderAnimalEditor() : null
        }
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
