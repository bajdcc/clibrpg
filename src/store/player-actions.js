import store from "./store";

export function setPlayerValue(changes = {}) {
  store.dispatch({
    type: "SET_PLAYER_VALUE",
    payload: {
      changes: { ...changes }
    }
  });
}

