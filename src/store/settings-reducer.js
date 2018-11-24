import {setValue} from "./util";

export function settings(state = {}, action) {
  switch (action.type) {
    case "SET_SETTINGS_VALUE":
      return setValue(state, action.payload.changes);

    default:
      return state;
  }
}
