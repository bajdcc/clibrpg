import React from "react";
import {connect} from "react-redux";
import {Col, message, Progress, Row} from 'antd';
import _ from "lodash";
import {setPlayerValue} from "../../store/player-actions";
import {randomN} from "./util";
import UIFightRunBar from "./UIFightRunBar";

class UIFightBar extends React.Component {

  constructor(props) {
    super(props);
    const {player, animal} = this.props;
    const ani = animal[player.fightA];
    this.state = {
      ani: ani,
      blood: ani[2],
      magic: ani[7],
      magicID: -1,
      playerID: -1,
      animalID: -1,
      overID: -1,
    };
    this.addFightLog(1, `<${player.name}>与<${ani[0]}>开始交战！`);
    setTimeout(this.combat.bind(this), 100);
  }

  componentWillUnmount() {
    const {magicID, playerID, animalID, overID} = this.state;
    if (magicID >= 0)
      clearTimeout(magicID);
    if (playerID >= 0)
      clearTimeout(playerID);
    if (animalID >= 0)
      clearTimeout(animalID);
    if (overID >= 0)
      clearTimeout(overID);
  }

  combat() {
    const {player, animal} = this.props;
    const ani = animal[player.fightA];
    this.addFightLog(1,
      `<${player.name}>将在${ani[7]}秒内受到<${ani[0]}>${ani[7] * ani[8]}点魔法伤害！`);
    this.setState({
      magicID: setTimeout(this.magicCombat.bind(this), 1000)
    });
    setTimeout(this.physicalCombat.bind(this), 0);
  }

  magicCombat() {
    const {player, animal} = this.props;
    const ani = animal[player.fightA];
    if (this.state.magic > 0) {
      if (player.useblood <= ani[8])
        return;
      setPlayerValue({
        useblood: player.useblood - ani[8]
      });
      this.addFightLog(2,
        `<${player.name}>受到<${ani[0]}>${ani[8]}点魔法伤害！`);
      this.setState({
        magic: this.state.magic - 1,
        magicID: setTimeout(this.magicCombat.bind(this), 1000)
      });
    }
  }

  physicalCombat() {
    this.setState({
      playerID: setTimeout(this.playerCombat.bind(this), 100)
    });
  }

  playerCombat() {
    const {player, animal} = this.props;
    const ani = animal[player.fightA];
    const att = _.max([0, player.att + randomN() - ani[4]]);
    if (att > 0)
      this.addFightLog(0,
        `<${ani[0]}>受到<${player.name}>${att}点物理伤害！`);
    else
      this.addFightLog(1,
        `<${ani[0]}>成功躲过了<${player.name}>的攻击！`);
    this.setState({
      blood: this.state.blood - att
    });
    if (player.useblood > 0 && !this.checkCombatFinish())
      this.setState({
        animalID: setTimeout(this.animalCombat.bind(this), 1000)
      });
  }

  animalCombat() {
    const {player, animal} = this.props;
    const ani = animal[player.fightA];
    const att = _.max([0, ani[3] + randomN() - player.def]);
    if (att > 0)
      this.addFightLog(2,
        `<${player.name}>受到<${ani[0]}>${att}点物理伤害！`);
    else
      this.addFightLog(1,
        `<${player.name}>成功躲过了<${ani[0]}>的攻击！`);
    setPlayerValue({
      useblood: player.useblood - att
    });
    if (player.useblood > att)
      this.setState({
        playerID: setTimeout(this.playerCombat.bind(this), 1000)
      });
  }

  checkCombatFinish() {
    if (this.state.blood < 0) {
      setTimeout(this.combatOver.bind(this), 100);
      return true;
    }
    return false;
  }

  combatOver() {
    const {player, animal, winN} = this.props;
    const ani = animal[player.fightA];
    const money = ani[5] + Math.floor(randomN() / 2);
    const exp = ani[6] + Math.floor(randomN() / 2);
    const logs = [
      `<${player.name}>打败了<${ani[0]}>！`,
      `<${player.name}>获得了<$${money}金钱>和<${exp}经验>！`
    ];
    this.addFightLog(0, logs[0]);
    message.success(logs[0]);
    this.addFightLog(0, logs[1]);
    message.success(logs[1]);
    winN.push({
      id: player.fightA,
      count: 1,
    });
    setPlayerValue({
      winN: winN,
      money: player.money + money,
      exping: player.exping + exp,
    });
    this.setState({
      overID: setTimeout(() => {
        setPlayerValue({
          fightN: false,
          fightA: 0,
          fightL: [],
        });
      }, 2000)
    });
  }

  addFightLog(id, txt) {
    const {player} = this.props;
    let fightL = player.fightL || [];
    if (fightL.length > 4) {
      fightL.pop();
    }
    setPlayerValue({
      fightL: [[id, txt], ...fightL]
    });
  }

  render() {
    const {ani, blood} = this.state;
    const percent = 100 * blood / ani[2];
    return (
      <div>
        <Row><Col span={6}>属性：</Col><Col span={18}>{ani[1]}级-{ani[9]}系</Col></Row>
        <Row><Col span={6}>金钱：</Col><Col span={18}>${ani[5]}</Col></Row>
        <Row><Col span={6}>攻击：</Col><Col span={18}>{ani[3]}</Col></Row>
        <Row><Col span={6}>防御：</Col><Col span={18}>{ani[4]}</Col></Row>
        <Row><Col span={6}>生命：</Col><Col span={18}><Progress percent={percent} showInfo={false}/></Col></Row>
        <Row><Col span={6}>经验：</Col><Col span={18}>{ani[6]}</Col></Row>
        <br/>
        <UIFightRunBar/>
      </div>
    );
  }
}

export default connect((state, props) => {
  return {
    player: state.player,
    animal: state.settings.animal,
    winN: state.player.winN,
  };
})(UIFightBar);
