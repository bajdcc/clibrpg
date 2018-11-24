import React from "react";
import {connect} from "react-redux";
import {Col, Radio, Row} from 'antd';
import _ from 'lodash';
import {setPlayerValue} from "../../store/player-actions";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class UIMapBar extends React.Component {

  onChange(e) {
    setPlayerValue({
      maping: e.target.value
    });
  }

  render() {
    const {maping, map} = this.props;
    const ids = _(map[maping][2]).map((id) => {
      return <RadioButton key={id} value={id}>{map[id][1]}</RadioButton>
    }).value();
    return (
      <div>
        <Row>
          <Col>
            通往：
          </Col>
        </Row>
        <Row>
          <Col>
            <RadioGroup onChange={this.onChange.bind(this)}>
              {ids}
            </RadioGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect((state, props) => {
  return {
    maping: state.player.maping,
    map: state.settings.map,
  };
})(UIMapBar);
