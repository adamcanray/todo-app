import { put as putTS, call as callTS } from "typed-redux-saga";
import { takeLatest } from "redux-saga/effects";
import { task_action } from "..";
import { rest } from "../../../../infrastructure";

export function* watchTask() {
  yield takeLatest(task_action.taskList.toString(), taskListWorker);
}

export function* taskListWorker() {
  yield* putTS(task_action.taskListFlowRequestSetter(true));

  const { res, err } = yield* callTS(rest.task.task_rest.RestTaskList);

  if (res) {
    yield* putTS(task_action.taskListResponseSuccessSetter(res.data));
    yield* putTS(task_action.taskListFlowSuccessSetter(true));
    yield* putTS(task_action.taskListFlowFailureSetter(false));
  } else {
    yield* putTS(task_action.taskListResponseFailureSetter(err.response.data));
    yield* putTS(task_action.taskListFlowSuccessSetter(false));
    yield* putTS(task_action.taskListFlowFailureSetter(true));
  }

  yield* putTS(task_action.taskListFlowRequestSetter(false));
}
