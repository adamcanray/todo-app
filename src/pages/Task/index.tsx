import { Box } from "@mui/material";
import { useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import { task_action } from "../../application/saga/task";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../application/store";
import { TaskColumn } from "../../components";

const Task = () => {
  const dispatch = useAppDispatch();
  const taskMockData = useAppSelector((state: RootState) => state.task.mock);

  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    console.log(result);
    const { destination, source, draggableId, type } = result;

    // destination can be null in some case
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColomnOrder = Array.from(taskMockData.columnOrder);
      newColomnOrder.splice(source.index, 1);
      newColomnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...taskMockData,
        columnOrder: newColomnOrder,
      };
      dispatch(task_action.taskMockSetter(newState));
    }

    // const column = taskMockData.columns[source.droppableId];
    const start = taskMockData.columns[source.droppableId];
    const finish = taskMockData.columns[destination.droppableId];

    if (start === undefined || finish === undefined) {
      return;
    }

    if (start === finish) {
      console.log(start);
      console.log(finish);
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1); // remove 1 task id from source
      newTaskIds.splice(destination.index, 0, draggableId); // remoce nothing and insert draggableId

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...taskMockData,
        columns: {
          ...taskMockData.columns,
          [newColumn.id]: newColumn,
        },
      };

      dispatch(task_action.taskMockSetter(newState));
      return;
    }

    // movin from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...taskMockData,
      columns: {
        ...taskMockData.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    dispatch(task_action.taskMockSetter(newState));
  };

  useEffect(() => {
    dispatch(task_action.taskList());
  }, [dispatch]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <Box
            {...provided.droppableProps}
            ref={provided.innerRef}
            display="flex"
          >
            {taskMockData.columnOrder.map((columnId, index) => {
              const column = taskMockData.columns[columnId];
              const tasks = column.taskIds.map(
                (taskId: any) => taskMockData.tasks[taskId]
              );
              return (
                <TaskColumn
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default Task;
