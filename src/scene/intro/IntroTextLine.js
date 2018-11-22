import React from "react";
import SkippableTextLine from '../text/SkippableTextLine'

class IntroTextLine extends React.Component {
  render() {
    return (
      <SkippableTextLine
        lineData={this.props.text}
        onDone={this.props.onTextComplete.bind(this)}
      />
    );
  }
}

export default IntroTextLine;
