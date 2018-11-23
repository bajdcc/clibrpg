import React, {Component} from 'react';
import {connect} from "react-redux";
import Scene from "./scene/Scene";
import IntroScene from "./scene/intro/IntroScene";
import NormalScene from "./scene/normal/NormalScene";
import DefaultScene from "./scene/default/DefaultScene";

class App extends Component {

  render() {
    if (this.props.scene === "intro") {
      return (
        <Scene>
          <IntroScene/>
        </Scene>
      );
    }

    if (this.props.scene === "normal")
      return (
        <Scene>
          <NormalScene/>
        </Scene>
      );

    return (
      <Scene>
        <DefaultScene/>
      </Scene>
    );
  }
}

export default connect((state, props) => {
  return {
    scene: state.global.scene,
  };
})(App);
