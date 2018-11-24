import React from "react";
import {connect} from "react-redux";
import {Col, Popover, Radio, Row} from 'antd';
import _ from 'lodash';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class UIPeopleBar extends React.Component {

  onChange(e) {
  }

  conv(txt) {
    return _(txt.split(/\n/)).map((a) => <p>{a}</p>).value();
  }

  render() {
    const {maping, map, people} = this.props;
    if (map[maping][4].length === 0)
      return null;
    const ids = _(map[maping][4]).map((id) => {
      const peo = people[id];
      return (
        <Popover key={id} content={this.conv(peo[4])} title={`<${peo[1]}> - <${peo[2]}>`}>
          <RadioButton value={id}>{peo[2]}</RadioButton>
        </Popover>
      )
    }).value();
    return (
      <div>
        <Row>
          <Col>
            NPC：
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
    people: state.settings.people,
  };
})(UIPeopleBar);
