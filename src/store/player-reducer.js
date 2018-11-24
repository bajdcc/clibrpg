import {setValue} from "./util";

export function player(state = {}, action) {
  switch (action.type) {
    case "SET_PLAYER_VALUE":
      return setValue(state, action.payload.changes);

    default:
      return state;
  }
}
