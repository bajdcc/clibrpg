import React from "react";
import {connect} from "react-redux";
import {Col, Popover, Progress, Row} from 'antd';
import {setPlayerValue} from "../../store/player-actions";

class UIHealthBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      addID: setTimeout(this.addBlood.bind(this), this.props.ADD_time)
    };
  }

  componentWillUnmount() {
    if (this.state.addID >= 0)
      clearTimeout(this.state.addID);
  }

  addBlood() {
    const {blood, useblood} = this.props;
    if (useblood < 0)
      return;
    if (useblood > blood || useblood + this.props.ADD_blood > blood) {
      setPlayerValue({
        useblood: blood
      });
    } else {
      setPlayerValue({
        useblood: useblood + this.props.ADD_blood
      });
    }
    this.setState({
      addID: setTimeout(this.addBlood.bind(this), this.props.ADD_time)
    });
  }

  render() {
    const {blood, useblood} = this.props;
    const percent = 100 * useblood / blood;
    const active = useblood < blood;
    const info = `${Math.floor(useblood)}/${blood}`;
    return (
      <Popover content={info} title="生命">
        <Row>
          <Col span={6}>
            生命：
          </Col>
          <Col span={18}>
            {
              active ?
                <Progress percent={percent} showInfo={false} status={percent < 20 ? "exception" : "active"}/>
                :
                <Progress percent={percent} showInfo={false}/>
            }
          </Col>
        </Row>
      </Popover>
    );
  }
}

export default connect((state, props) => {
  return {
    blood: state.player.blood,
    useblood: state.player.useblood,
    ADD_blood: state.settings.ADD_blood,
    ADD_time: state.settings.ADD_time,
  };
})(UIHealthBar);
