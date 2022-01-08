import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { task_action } from "./application/saga/task";
import { RootState, useAppDispatch, useAppSelector } from "./application/store";

function App() {
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
      {taskListData.map((e, i) => (
        <Typography>{e.title}</Typography>
      ))}
    </Box>
  );
}

export default App;
