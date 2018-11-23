import React from "react";
import {connect} from "react-redux";

class IntroLaptop extends React.Component {
  getTranslateValue() {
    if (this.props.isLowered) {
      return `translate3d(0,24em,0)`;
    }

    // const {vH} = this.props;
    return `translate3d(0,0,0)`;
  }

  getMobileStyle() {
    const {vH} = this.props;
    return {
      height: vH * 30,
      padding: "10% 8% 0%",
      lineHeight: "1.8em"
    };
  }

  getDesktopStyle() {
    const {vH, vW} = this.props;
    return {
      width: vW * 88,
      height: vH * 88,
      bottom: 0,
      left: 0,
      paddingTop: vW * 3,
      paddingLeft: vW * 3,
      paddingRight: vW * 3,
      fontSize: "1em",
      lineHeight: "2.2em"
    };
  }

  render() {
    const {viewportMode} = this.props;

    const viewportModeStyles =
      viewportMode === "portrait"
        ? this.getMobileStyle()
        : this.getDesktopStyle();

    const style = {
      position: "relative",
      zIndex: 3,

      //Need to control translate with transition
      transform: this.getTranslateValue(),
      transition: "transform 0.5s",
      backgroundColor: "#000",
      backgroundRepeat: "no-repeat",
      backgroundSize: "100%",
      ...viewportModeStyles
    };

    return (
      <div style={style}>
        {this.props.children}
      </div>
    );
  }
}

export default connect((state, props) => {
  return {
    viewportMode: state.global.viewportMode,
    vH: state.global.vH,
    vW: state.global.vW
    //someProp: state.something.someProp
  };
})(IntroLaptop);
