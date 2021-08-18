import * as redux from "redux";
import reduxSaga from "redux-saga";
import  users  from "./Redux-Saga3/Reducers3";
import rootSaga from "./Redux-Saga3/RootSaga";

export const myStore3 = () => {
  const initialState = {};
  const reduxSagaMiddleWare = reduxSaga();
  const store = redux.createStore(
    users,
    initialState,
    redux.applyMiddleware(reduxSagaMiddleWare)
  );
  reduxSagaMiddleWare.run(rootSaga);
  return store;
};
