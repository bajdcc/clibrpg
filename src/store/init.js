import {createStore, combineReducers} from "redux";
import * as globalReducer from "./global-reducer";

export default function (data) {
  let reducer = combineReducers({
    ...globalReducer,
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
