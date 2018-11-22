import store from "./store";

export function setGlobalValue(changes = {}) {
  store.dispatch({
    type: "SET_GLOBAL_VALUE",
    payload: {
      changes: { ...changes }
    }
  });
}

//Abstraction for setting Viewport W and H
export function setViewportSize(width, height, mode = "portrait") {
  store.dispatch({
    type: "SET_GLOBAL_VALUE",
    payload: {
      changes: {
        vW: Math.round(width / 100),
        vH: Math.round(height / 100),
        viewportMode: mode,
        viewportWidth: width,
        viewportHeight: height
      }
    }
  });
}
