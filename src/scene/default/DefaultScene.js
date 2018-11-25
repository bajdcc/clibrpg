import React from "react";
import {connect} from "react-redux";
import {convertSpeechArrayToTextLineArray} from "../text/convert-speech";
import IntroTextLine from "../intro/IntroTextLine";
import {setPlayerValue} from "../../store/player-actions";
import IntroOverlay from "../intro/IntroOverlay";
import {Col, Row} from "antd";
import IntroLaptop from "../intro/IntroLaptop";

class DefaultScene extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOverlayOpaque: true,
      isLaptopLowered: false,
      step: "fade-in",
    };
  }

  componentDidMount() {
    //First Step: fade out the overlay
    setTimeout(() => {
      this.setState({isOverlayOpaque: false})
    }, 200)
  }

  handleOverlayDone() {
    setTimeout(() => {
      //Start the intro text
      this.setState({step: "intro"})
    }, 200)
  }

  over() {
    const def = {
      name: "匿名玩家",   //名字
      level: 1,           //等级
      exping: 0,          //当前经验
      exped: 0,           //当前经验上限
      money: 0,           //金钱
      blood: 100,         //生命值上限
      useblood: 100,      //生命值
      att: 6,             //攻击
      def: 6,             //防御
      fightN: false,      //是否战斗状态
      fightA: 0,          //怪物战斗编号
      fightL: [],         //战斗情况
      maping: 0,          //当前地图,
      winN: [],           //杀死怪物次数
      states: {},         //状态
    };
    def.useblood = def.blood;
    def.exped = def.exped[def.level];
    setPlayerValue(def);
  }

  renderContent() {
    if (this.state.step === "intro") {
      const introText = convertSpeechArrayToTextLineArray(
        [
          "[CRAWL]游戏结束！",
          "[CRAWL]Game over.",
          "[CRAWL]...",
        ],
        {defaultTextColor: "#fff"}
      );

      return (
        <IntroTextLine
          key="4"
          text={introText}
          onTextComplete={this.over.bind(this)}
        />
      );
    }

    return null;
  }

  getDesktopWrap() {
    if (this.props.viewportMode === "portrait") {
      return {};
    }
    return {
      width: "100%",
      margin: "0 auto"
    };
  }

  render() {
    const style = {
      fontSize: this.props.viewportMode === "portrait" ? "0.8em" : "0.5em", //mobile, desktop
    };
    const contentStyle = {
      ...this.getDesktopWrap()
    };

    return (
      <div>
        <IntroOverlay
          isOpaque={this.state.isOverlayOpaque}
          onTransitionComplete={this.handleOverlayDone.bind(this)}
        />
        <Row type="flex" justify="space-around" align="middle">
          <Col style={style}>
            <div style={contentStyle}>
              {
                !this.state.isLaptopLowered ? (
                  <IntroLaptop>
                    {this.renderContent()}
                  </IntroLaptop>
                ) : null
              }
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect((state, props) => {
  return {
    player: state.player,
    viewportMode: state.global.viewportMode,
  };
})(DefaultScene);
