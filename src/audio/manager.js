import { Howl } from "howler";
import Music from "./music";
import Sfx from "./sfx";

let sfxHowls = {};
Object.keys(Sfx).forEach(key => {
  sfxHowls[key] = new Howl(Sfx[key]);
});

export default {
  //SFX
  currentSong: null,
  isFirstSongTrigger: false, //default to false
  currentSongKey: "",

  playSong(songKey) {

    //If this song is already playing, bail out so it doesnt start over!
    if (this.currentSongKey === songKey) {
      return;
    }

    //Stop any old song that is playing
    if (this.currentSong) {
      this.currentSong.stop();
      this.currentSong = null; //delete it!
    }

    //Play the new one!
    this.currentSongKey = songKey;
    this.currentSong = new Howl(Music[songKey]);

    //Play the song!
    this.currentSong.play();


  },
  stopSong() {
    if (this.currentSong) {
      this.currentSong.stop();
    }
  },

  changeSongVolume(status) {
    if (this.currentSong) {
      if (status === "off") {
        this.currentSong.volume(0);
      }
      if (status === "on") {
        //NOTE: need to remember old song's initial volume!
        this.currentSong.volume(Music[this.currentSongKey].volume || 1);
      }
    }
  },

  sfxHowls: sfxHowls,

  //SFX bank
  playSfx(sfxKey) {
    sfxHowls[sfxKey].play();
  }
};
