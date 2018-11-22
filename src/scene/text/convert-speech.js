export function convertSpeechArrayToTextLineArray(array, userOptions = {}) {
  //Defaults
  const options = {
    playerTeamId: "unknown",
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

        //Feature: variable names for colors! Have presets that decide the color.
        //This is important for one piece of text having multiple contexts depending on the reader. (EX: team colors)
        //Potentially replace COLOR variable name `COLORVAR` with an actual hex.

        //Case 1: team name. Check if the user is on this team (playerTeam provided by options.playerTeamId)
        if (color.match(/COLORVAR_NAME_FROM_TEAM::/)) {
          const teamId = color.replace("COLORVAR_NAME_FROM_TEAM::", "");
          color =
            teamId === options.playerTeamId
              ? "#4A90E2" //Friend Blue
              : "#FC304A"; //Enemy Red
        }
        //

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
