import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TTask } from "../../../model";

interface ItaskState {
  list: {
    response: {
      success: {
        data: Array<TTask>;
      };
      failure: {
        status: string;
        message: string;
      };
    };
    flow: {
      request: boolean;
      success: boolean;
      failure: boolean;
    };
  };
  mock: {
    tasks: any;
    columns: any;
    columnOrder: Array<string>;
  };
}

const taskState: ItaskState = {
  list: {
    response: {
      success: {
        data: [],
      },
      failure: {
        status: "",
        message: "",
      },
    },
    flow: {
      request: false,
      success: false,
      failure: false,
    },
  },
  mock: {
    tasks: {},
    columns: {
      "column-1": {
        id: "column-1",
        title: "To do",
        taskIds: [],
      },
      "column-2": {
        id: "column-2",
        title: "Done",
        taskIds: [],
      },
    },
    columnOrder: ["column-1", "column-2"],
  },
};

export const taskSlice = createSlice({
  name: "task",
  initialState: taskState,
  reducers: {
    taskListFlowRequestSetter: (state, action: PayloadAction<boolean>) => {
      state.list.flow.request = action.payload;
    },
    taskListFlowSuccessSetter: (state, action: PayloadAction<boolean>) => {
      state.list.flow.success = action.payload;
    },
    taskListFlowFailureSetter: (state, action: PayloadAction<boolean>) => {
      state.list.flow.failure = action.payload;
    },
    taskListResponseSuccessSetter: (
      state,
      action: PayloadAction<Array<TTask>>
    ) => {
      state.list.response.success.data = action.payload;
    },
    taskListResponseFailureSetter: (
      state,
      action: PayloadAction<{ status: string; message: string }>
    ) => {
      state.list.response.failure = action.payload;
    },

    // taskMockTasksSetter: (state, action: PayloadAction<TTask>) => {
    //   state.mock.tasks[action.payload.id] = action.payload;
    // },
    // taskMockColumnsSetter: (
    //   state,
    //   action: PayloadAction<{
    //     id: string;
    //     title: "stirng";
    //     taskIds: Array<string>;
    //   }>
    // ) => {
    //   state.mock.columns[action.payload.id] = action.payload;
    // },
    // taskMockColumnOrderSetter: (
    //   state,
    //   action: PayloadAction<Array<string>>
    // ) => {
    //   state.mock.columnOrder = action.payload;
    // },
    taskMockSetter: (state, action: PayloadAction<any>) => {
      state.mock = action.payload;
    },
  },
});

export const taskReducer = taskSlice.reducer;
