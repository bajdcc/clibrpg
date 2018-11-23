import React from "react";
import audioManager from "../../audio/manager";

class TextLine extends React.Component {
  constructor(props) {
    super(props);
    this.animFrameStep = null; //Keep a reference to the animationFrame step so we can cancel
    this.state = {
      revealedIndex: -1 //count upwards
    };
  }

  componentDidMount() {
    this.revealNext(Date.now() + 10); //start X ms after mounting.
  }

  componentWillUnmount() {
    //cancel the frame count on unmount
    cancelAnimationFrame(this.animFrameStep);
  }

  componentWillReceiveProps(newProps) {
    //We've received instructions to force the text to the end.
    if (newProps.isForcedDone) {
      //Cancel anything that has been called.
      cancelAnimationFrame(this.animFrameStep);

      //Warp to the end (assuming 999 is far beyond max)
      this.setState(
        {
          revealedIndex: 999
        },
        () => {
          //Then call the final callback
          if (typeof this.props.onDone === "function") {
            this.props.onDone();
          }
        }
      );
    }
  }

  revealNext(targetTimestamp) {
    //recursive

    let step = () => {
      if (Date.now() < targetTimestamp) {
        //Try again next frame and check again
        this.animFrameStep = requestAnimationFrame(step);
      } else {
        //Time to reveal the next character

        const nextIndex = this.state.revealedIndex + 1;
        this.setState(
          {
            revealedIndex: nextIndex
          },
          () => {
            //There is at least anotehr character in the text line...
            if (nextIndex < this.props.lineData.length - 1) {
              //Play sound!
              //TODO: Should this SFX be passed in? So we have options?
              if (this.props.lineData[nextIndex].char !== " ") {
                //don't play on space characters
                //sfxTypeBlip.play();
                audioManager.playSfx("sfx_typeBlip");
              }

              //Call again with updated time delay
              const msToNextChar = this.props.lineData[nextIndex].msToNextChar;
              this.revealNext(Date.now() + msToNextChar);
            } else {
              //End of the series. Call the passed in callback!
              if (typeof this.props.onDone === "function") {
                this.props.onDone();
              }
            }
          }
        );
      }
    };

    //Kick off the first step
    this.animFrameStep = requestAnimationFrame(step);
  }

  render() {
    const string = this.props.lineData.map((characterModel, i) => {
      const style = {
        opacity: i <= this.state.revealedIndex ? 1 : 0,
        color: characterModel.color, //will always have a color
        fontFamily: "Kaiti",
        fontSize: "24px"
      };
      return (
        <span key={i} style={style}>
          {characterModel.char}
        </span>
      );
    });

    return (
      <span>
        {string}
      </span>
    );
  }
}

export default TextLine;
