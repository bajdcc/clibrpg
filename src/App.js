import React, {Component} from 'react';
import {connect} from "react-redux";
import Scene from "./scene/Scene";
import IntroScene from "./scene/intro/IntroScene";
import NormalScene from "./scene/normal/NormalScene";
import DefaultScene from "./scene/default/DefaultScene";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showIntro: true
    };
  }

  render() {
    if (this.state.showIntro) {
      return (
        <Scene>
          <IntroScene/>
        </Scene>
      );
    }

    if (this.state.scene === "normal")
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
