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
  },
});

export const taskReducer = taskSlice.reducer;
