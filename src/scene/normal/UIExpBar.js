import React from "react";
import {connect} from "react-redux";
import {Row, Col, Progress, Popover} from 'antd';

class UIExpBar extends React.Component {

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
  };
})(UIExpBar);
