import React from 'react'

export default class IntroOverlay extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isHidden: false //Is this rendering as 'null' to not block anything
    }
  }

  handleTransitionEnd() {
    if (typeof this.props.onTransitionComplete === "function") {
      this.setState({
        isHidden: true
      }, () => {
        this.props.onTransitionComplete();
      })
    }
  }


  render() {

    if (this.state.isHidden) {
      return null
    }

    const style = {
      position: "absolute",
      zIndex: 100,
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      background: `#151825 radial-gradient(50% 105%, rgba(40,48,79,0.00) 52%, rgba(11,15,32,0.70) 100%)`,
      opacity: this.props.isOpaque ? 1 : 0,
      transition: "opacity 1.5s"
    };

    return (
      <div style={style} onTransitionEnd={this.handleTransitionEnd.bind(this)}/>
    );
  }
}
