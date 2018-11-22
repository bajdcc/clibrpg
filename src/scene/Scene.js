import React from "react";
import {connect} from "react-redux";
import {setViewportSize} from "../store/global-actions";

class Scene extends React.Component {
  componentWillMount() {
    this.setViewportModel(this.getViewportModel());
    //Watch for resizing window:
    let resizeTimeout;
    window.onresize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.setViewportModel(this.getViewportModel());
      }, 50);
    };
  }

  getViewportModel() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    if (windowWidth <= 600) {
      //TODO: unsure if this the right call, but basically a media query for <= px
      //mobile
      return {
        width: windowWidth, //TODO: Just use full mobile screen for now. Can cross this bridge later if we have issues
        height: windowHeight,
        mode: "portrait"
      };
    }

    //Get the computed value for //16:9 aspect ratio
    const windowHeightInRatioFromWidth = Math.round(windowWidth * 0.56);

    //If we can't fit the whole height of the screen, measure using the HEIGHT as the baseline
    if (windowHeightInRatioFromWidth > windowHeight) {
      // console.warn('cant fit!');
      return {
        width: Math.round(windowHeight * 1.77), //get 16:9 aspect ratio from height
        height: windowHeight,
        mode: "landscape"
      };
    }

    //desktop (with room to fit the computed height):
    return {
      width: windowWidth,
      height: windowHeightInRatioFromWidth, //16:9 aspect ratio
      mode: "landscape"
    };
  }

  setViewportModel(viewportModel) {
    //Apply viewportModel to redux state:
    const {width, height, mode} = viewportModel;
    setViewportSize(width, height, mode);
  }

  render() {
    //no measurement yet.
    if (this.props.viewportWidth <= 0 || this.props.viewportHeight <= 0) {
      return null;
    }

    const frameStyle = {
      position: "relative",
      width: this.props.viewportWidth,
      height: this.props.viewportHeight,
      // border: "1px solid red",
      margin: "0 auto", //In case we need to center a small'ed landscape view
      overflow: "hidden", //?

      //THIS IS THE GLOBAL FONT SIZE. EVERYTHING ELSE SHALL USE "em".
      fontSize:
        this.props.viewportMode === "portrait"
          ? this.props.vW * 4 //Mobile globalReducer font size
          : this.props.vW * 2 //Desktop globalReducer font size
    };

    const className = "RPGScene--" + this.props.viewportMode;

    return (
      <div style={frameStyle} className={className}>
        {this.props.children}
      </div>
    );
  }
}

export default connect((state, props) => {
  return {
    vW: state.global.vW,
    viewportMode: state.global.viewportMode,
    viewportWidth: state.global.viewportWidth,
    viewportHeight: state.global.viewportHeight
  };
})(Scene);
