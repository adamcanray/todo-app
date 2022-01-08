import { createAction } from "@reduxjs/toolkit";
import { taskSlice } from "../reducer/task_reducer";

const sliceName = taskSlice.name;

export const {
  taskListFlowFailureSetter,
  taskListFlowRequestSetter,
  taskListFlowSuccessSetter,
  taskListResponseFailureSetter,
  taskListResponseSuccessSetter,
  // taskMockColumnOrderSetter,
  // taskMockColumnsSetter,
  // taskMockTasksSetter,
  taskMockSetter,
} = taskSlice.actions;

export const taskList = createAction(`${sliceName}/taskList`);
export const taskMock = createAction(`${sliceName}/taskMock`);
