import {
  put as putTS,
  call as callTS,
  select as selectTS,
} from "typed-redux-saga";
import { takeLatest } from "redux-saga/effects";
import { task_action } from "..";
import { rest } from "../../../../infrastructure";
import { RootState } from "../../../store";

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

  const taskListData = yield* selectTS(
    (state: RootState) => state.task.list.response.success.data
  );
  const mock = yield* selectTS((state: RootState) => state.task.mock);

  let tasks: any = {
    1: {
      id: 1,
      title: "Make a meal",
      description: "lorem ipsum",
      status: 0,
      createdAt: "2019-11-15 18:00",
    },
  };
  taskListData.forEach((el) => {
    tasks[el.id] = el;
  });

  yield* putTS(task_action.taskMockSetter({ ...mock, tasks: tasks }));
}
