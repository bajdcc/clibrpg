export function convertSpeechArrayToTextLineArray(array, userOptions = {}) {
  //Defaults
  const options = {
    defaultTextColor: "#000", //The color of text when not explicitly defined by @@color_@@ prefix
    ...userOptions
  };

  let delivery = [];

  array.forEach((segment, index) => {
    if (!segment.match(/@@pause_/)) {
      let speed = 50;
      let color = options.defaultTextColor; //default?

      if (segment.match(/^\[LIGHTNING\]/i)) {
        segment = segment.replace("[LIGHTNING]", "");
        speed = 10;
      }
      if (segment.match(/^\[FAST\]/i)) {
        segment = segment.replace("[FAST]", "");
        speed = 35;
      }
      if (segment.match(/^\[SLOW\]/i)) {
        segment = segment.replace("[SLOW]", "");
        speed = 140;
      }
      if (segment.match(/^\[CRAWL\]/i)) {
        segment = segment.replace("[CRAWL]", "");
        speed = 360;
      }

      //Look for color flag, grab hex and use as the `color` value.
      if (segment.match(/^@@color_/)) {
        let extract = segment.match(/@@(.*)@@/).pop();
        color = extract.replace("color_", ""); //grab whatever comes after the `color_...` (expecting a hex, or a preset name)

        segment = segment.replace(`@@${extract}@@`, "");
      }

      const split = segment.split("").map(function(char) {
        return {
          color: color,
          char: char,
          msToNextChar: char !== " " ? speed : 0
        };
      });
      delivery = [...delivery, ...split];
    } else {
      const parsedDelay = segment.match(/\d+/g)[0];
      delivery = [
        ...delivery,
        {
          color: options.defaultTextColor,
          char: " ",
          msToNextChar: parseInt(parsedDelay, 10)
        }
      ];
    }
  });

  return delivery;
}
