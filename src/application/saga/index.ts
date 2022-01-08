import { all, fork } from "redux-saga/effects";
import { task_worker } from "./task";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function* saga() {
  yield all([fork(task_worker.watchTask)]);
}

export default saga;
