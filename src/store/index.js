import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

//Persist
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import sagas from "./sagas";
import reducers from "./ducks";
const persistConfig = {
  key: "root",
  storage
};

const middlewares = [];

const sagaMonitor =
  process.env.NODE_ENV === "development"
    ? console.tron.createSagaMonitor()
    : null;
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
middlewares.push(sagaMiddleware);

const createAppropriateStore =
  process.env.NODE_ENV === "development"
    ? console.tron.createStore
    : createStore;

//const store = createAppropriateStore(
//  reducers,
//  compose(applyMiddleware(...middlewares))
//);
//Persist Reducer
const persistedReducer = persistReducer(persistConfig, reducers);
const store = createAppropriateStore(
  persistedReducer,
  compose(applyMiddleware(...middlewares))
);
const persistor = persistStore(store);
sagaMiddleware.run(sagas);

//export default store;
export { store, persistor };
