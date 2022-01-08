import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { TTask } from "../../application/model";
import { task_action } from "../../application/saga/task";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../application/store";

const Task = () => {
  const dispatch = useAppDispatch();
  const taskListData = useAppSelector(
    (state: RootState) => state.task.list.response.success.data
  );
  useEffect(() => {
    dispatch(task_action.taskList());
  }, [dispatch]);
  return (
    <Box>
      <Typography variant="subtitle1">subtitle</Typography>
      <Typography>body1</Typography>
      <Button>Button</Button>
      {taskListData.map((e: TTask, i: number) => (
        <Typography>{e.title}</Typography>
      ))}
    </Box>
  );
};

export default Task;
