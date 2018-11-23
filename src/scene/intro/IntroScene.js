import React from "react";
import {connect} from "react-redux";
import {setGlobalValue} from "../../store/global-actions";
import {convertSpeechArrayToTextLineArray} from "../text/convert-speech";
import IntroTextLine from "./IntroTextLine";
import IntroOverlay from "./IntroOverlay";
import IntroLaptop from "./IntroLaptop";
import IntroInput from "./IntroInput";
import {Row, Col} from "antd";

class IntroScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOverlayOpaque: true,
      isLaptopLowered: false,
      step: "fade-out",
      nameFromUser: ""
    };
  }

  componentDidMount() {
    //First Step: fade out the overlay
    setTimeout(() => {
      this.setState({isOverlayOpaque: false})
    }, 200)
  }

  //Intro overlay is done fading out, revealing our character and laptop
  handleOverlayDone() {
    setTimeout(() => {
      //Start the intro text
      this.setState({step: "intro"})
    }, 200)
  }

  handleNameReceived(nameFromUserInput) {
    this.setState({
      step: "nice-to-meet-you",
      nameFromUser: nameFromUserInput
    });
  }

  exitIntro() {
    setTimeout(() => {
      setGlobalValue({scene: "normal"});
    }, 600);
  }

  getIntroText() {
    return [
      "你好！",
      "@@pause_300@@",
      "欢迎来到CC RPG WORLD！",
      "[FAST]版本 0.1！",
      "@@pause_300@@",
    ];
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

  setNextStep(nextStep, timeout = 1000) {
    setTimeout(() => {
      this.setState({step: nextStep});
    }, timeout);
  }

  renderContent() {
    //Step one: INTRO
    if (this.state.step === "intro") {
      const introText = convertSpeechArrayToTextLineArray(
        this.getIntroText(), //Returns the proper array of text to use
        {defaultTextColor: "#fff"}
      );
      return (
        <IntroTextLine
          key="1"
          text={introText}
          onTextComplete={this.setNextStep.bind(this, "intro2")}
        />
      );
    }

    //Step one: INTRO
    if (this.state.step === "intro2" || this.state.step === "getName") {
      const introText = convertSpeechArrayToTextLineArray(
        ["请输入你的名字！"],
        {defaultTextColor: "#fff"}
      );
      return (
        <IntroTextLine
          key="2"
          text={introText}
          onTextComplete={this.setNextStep.bind(this, "getName", 200)}
        />
      );
    }

    if (this.state.step === "nice-to-meet-you") {
      const introText = convertSpeechArrayToTextLineArray(
        [
          "太棒了！",
          "@@pause_300@@",
          `欢迎光临！${this.state.nameFromUser}！`
        ],
        {defaultTextColor: "#fff"}
      );

      return (
        <IntroTextLine
          key="3"
          text={introText}
          onTextComplete={this.setNextStep.bind(this, "end")}
        />
      );
    }

    if (this.state.step === "end") {
      const introText = convertSpeechArrayToTextLineArray(
        [
          "现在开始游戏吧！",
        ],
        {defaultTextColor: "#fff"}
      );

      return (
        <IntroTextLine
          key="4"
          text={introText}
          onTextComplete={this.setNextStep.bind(this, "wait")}
        />
      );
    }

    if (this.state.step === "wait") {
      const introText = convertSpeechArrayToTextLineArray(
        [
          "",
        ],
        {defaultTextColor: "#fff"}
      );

      return (
        <IntroTextLine
          key="5"
          text={introText}
          onTextComplete={this.setNextStep.bind(this, "wait")}
        />
      );
    }

    return null;
  }

  renderNameModal() {
    if (this.state.step === "getName") {
      return (
        <IntroInput
          onNameReceived={this.handleNameReceived.bind(this)}
          viewportMode={this.props.viewportMode}
        />
      );
    }
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
              <IntroLaptop isLowered={this.state.isLaptopLowered}>
                {this.renderContent()}
              </IntroLaptop>
            </div>
            {this.renderNameModal()}
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect((state, props) => {
  return {
    viewportMode: state.global.viewportMode,
  };
})(IntroScene);
