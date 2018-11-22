import React from "react";
import TextLine from "./TextLine";

class SkippableTextLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isForcedDone: false
    };
  }

  //TODO: Keyboard binding will go here too!
  handleClick() {
    this.setState({
      isForcedDone: true
    });
  }

  render() {
    //Pass in same props that TextLine needs
    return (
      <span
        onClick={this.handleClick.bind(this)}
        style={this.props.style || {}}
      >
        <TextLine
          isForcedDone={this.state.isForcedDone}
          lineData={this.props.lineData}
          onDone={this.props.onDone}
        />
      </span>
    );
  }
}

export default SkippableTextLine;
