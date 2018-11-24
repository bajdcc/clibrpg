import {createStore, combineReducers} from "redux";
import * as globalReducer from "./global-reducer";
import * as playerReducer from "./player-reducer";
import * as settingsReducer from "./settings-reducer";

export default function (data) {
  let reducer = combineReducers({
    ...globalReducer,
    ...playerReducer,
    ...settingsReducer,
    //...anotherReducer,
  });

  let store;
  if (typeof window === "object") {
    store = createStore(
      reducer,
      data,
      window.devToolsExtension ? window.devToolsExtension() : undefined
    );
  } else {
    store = createStore(reducer, data);
  }

  return store;
}
