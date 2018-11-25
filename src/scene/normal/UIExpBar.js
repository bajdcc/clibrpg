import React from "react";
import {connect} from "react-redux";
import {Row, Col, Progress, Popover, message} from 'antd';
import {setPlayerValue} from "../../store/player-actions";
import {setSettingsValue} from "../../store/settings-actions";

class UIExpBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expID: setTimeout(this.checkUpgrade.bind(this), 1000)
    };
  }

  componentWillUnmount() {
    if (this.state.expID >= 0)
      clearTimeout(this.state.expID);
  }

  checkUpgrade() {
    const {exping, exped, player, Uplevel, Exped, ADD_life, ADD_att, ADD_def, ADD_blood} = this.props;
    if (exping >= exped && player.level < Uplevel && player.useblood > 0) {
      if (player.level % 10 === 0) {
        setSettingsValue({
          ADD_blood: ADD_blood + 1
        });
      }
      setPlayerValue({
        level: player.level + 1,
        blood: player.blood + ADD_life,
        att: player.att + ADD_att,
        def: player.def + ADD_def,
        exping: exping - exped,
        exped: Exped[player.level],
      });
      message.success(`<${player.name}>升到了<${player.level + 1}>级！`);
    }
    this.setState({
      expID: setTimeout(this.checkUpgrade.bind(this), 1000)
    });
  }

  render() {
    const {exping, exped} = this.props;
    const percent = 100 * exping / exped;
    const info = `${exping}/${exped}`;
    return (
      <Popover content={info} title="经验">
        <Row>
          <Col span={6}>
        经验：
          </Col>
          <Col span={18}>
            <Progress percent={percent} showInfo={false}/>
          </Col>
        </Row>
      </Popover>
    );
  }
}

export default connect((state, props) => {
  return {
    exping: state.player.exping,
    exped: state.player.exped,
    player: state.player,
    Uplevel: state.settings.Uplevel,
    Exped: state.settings.exped,
    ADD_blood: state.settings.ADD_blood,
    ADD_life: state.settings.ADD_life,
    ADD_att: state.settings.ADD_att,
    ADD_def: state.settings.ADD_def,
  };
})(UIExpBar);
