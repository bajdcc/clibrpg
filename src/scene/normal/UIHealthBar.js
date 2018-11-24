import React from "react";
import {connect} from "react-redux";
import {Row, Col, Progress, Popover} from 'antd';

class UIHealthBar extends React.Component {

  render() {
    const {blood, useblood} = this.props;
    const percent = 100 * useblood / blood;
    const active = useblood < blood;
    const info = `${useblood}/${blood}`;
    return (
      <Popover content={info} title="生命">
        <Row>
          <Col span={6}>
            生命：
          </Col>
          <Col span={18}>
            {
              active ?
                <Progress percent={percent} showInfo={false} status="active"/>
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
  };
})(UIHealthBar);
