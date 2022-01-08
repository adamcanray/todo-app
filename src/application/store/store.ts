import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import createSageMiddleware from "redux-saga";
import saga from "../saga";
import { task_reducer } from "../saga/task";

const rootReducer = combineReducers({
  task: task_reducer.taskReducer,
});

const sagaMiddleware = createSageMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(
      sagaMiddleware
    ),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { sagaMiddleware };

sagaMiddleware.run(saga);
