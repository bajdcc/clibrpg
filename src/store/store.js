import createStore from "./init";

const store = createStore({
  global: {
    //Viewport stuff
    vW: 0,
    viewportWidth: 0,
    viewportHeight: 0,
    //viewportMode: Desktop/Mobile layout. Automatically set by GameFrame.js
    viewportMode: "portrait", //"portrait" or "landscape"

    scene: "intro",
  }
});

export default store;
