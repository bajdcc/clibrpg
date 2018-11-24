import store from "./store";

export function setSettingsValue(changes = {}) {
  store.dispatch({
    type: "SET_SETTINGS_VALUE",
    payload: {
      changes: { ...changes }
    }
  });
}
