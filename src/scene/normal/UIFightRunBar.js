import React from "react";
import {connect} from "react-redux";
import {Button, message} from 'antd';
import {randomN, runN} from "./util";
import {setPlayerValue} from "../../store/player-actions";

class UIFightRunBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      enable: true,
      showID: -1,
    };
  }

  componentWillUnmount() {
    if (this.state.showID)
      clearTimeout(this.state.showID);
  }

  reload() {
    this.setState({
      enable: true,
      showID: -1,
    });
  }

  onClick() {
    if (!this.state.enable)
      return;
    if (runN(4 + randomN())) {
      message.success("逃跑成功！");
      setPlayerValue({
        fightN: false,
        fightA: 0,
        fightL: [],
        winN: [],
      });
    } else {
      message.error("逃跑失败！");
      this.setState({
        enable: false,
        showID: setTimeout(this.reload.bind(this), 5000)
      });
    }
  }

  render() {
    return (
      <Button type="primary" loading={!this.state.enable} onClick={this.onClick.bind(this)}>
        逃跑
      </Button>
    );
  }
}

export default connect((state, props) => {
  return {};
})(UIFightRunBar);
