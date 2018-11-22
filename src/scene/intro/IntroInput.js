/* eslint jsx-a11y/href-no-hash: "off" */

import React from "react";

class IntroInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingForm: false,
      showingCompletedName: null
    };
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({isShowingForm: true});
    }, 600);
  }

  handleSubmitButton(e) {
    e.preventDefault();
    this.handleNameSubmit();
  }

  capAt10Chars() {
    //If iOS pastes in a name that thrawrts maxLength, just shorten it here.
    this.refs.name.value = this.refs.name.value.substr(0, 9)
  }

  handleNameSubmit(e) {
    if (e) {
      e.preventDefault();
    }

    let newValue = this.refs.name.value;

    //valid length!
    this.setState({
      showingCompletedName: newValue,
    });

    //Wait a second for effect, then proceed
    setTimeout(() => {
      this.props.onNameReceived(newValue);
    }, 1000);
  }

  renderInputArea() {
    //If we've submitted, show just the name for a second.
    if (this.state.showingCompletedName) {
      const style = {
        fontSize: "1.8em",
        textAlign: "center"
      };
      return (
        <div style={style}>
          {this.state.showingCompletedName}!
        </div>
      );
    }

    //Default to the form field
    return (
      <input
        onChange={this.capAt10Chars.bind(this)}
        className="NameTextInput"
        style={{width: "200px", border: "1px solid #ccc 3px", padding: "7px 0px 5px 0px"}}
        id="onboarding-name-input"
        ref="name"
        type="text"
        maxLength={10}
        autoFocus={true}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />
    );
  }

  renderForm() {
    const overlayStyle = {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      zIndex: 4,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      padding: "2em"
    };

    const modalStyle = {
      padding: "3em",
      margin: "0 auto",
      width: "100%",
      zIndex: "1",
      position: "relative",
      maxWidth: this.props.viewportMode === "landscape" ? "33em" : "100%" //desktop, mobile
    };

    //If we haven't submitted yet, show a form:
    return (
      <div style={overlayStyle}>
        <div style={modalStyle}>
          <form ref="form" onSubmit={this.handleNameSubmit.bind(this)}>
            {this.renderInputArea()}
          </form>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.state.isShowingForm ? this.renderForm() : null}
      </div>
    );
  }
}

export default IntroInput;
