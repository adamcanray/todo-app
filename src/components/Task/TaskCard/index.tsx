import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import { TTask } from "../../../application/model";

type TContainer = {
  isDragging: boolean;
};

const Container = styled("div")((props: TContainer) => ({
  border: "1px solid lightgrey",
  borderRadius: "2px",
  padding: "8px",
  marginBottom: "8px",
  backgroundColor: `${props.isDragging ? "lightgreen" : "white"};`,
  display: "flex",
}));

type TPropsTask = {
  task: TTask;
  index: number;
};
type TStateTask = {};

export default class Task extends Component<TPropsTask, TStateTask> {
  render() {
    return (
      <Draggable
        draggableId={this.props.task.id.toString()}
        index={this.props.index}
      >
        {(provided, snapshot) => (
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isDragging={snapshot.isDragging}
            aria-roledescription="Press space bar to lift the task"
          >
            {/* <Handle {...provided.dragHandleProps} /> */}
            <Typography>{this.props.task.title}</Typography>
          </Container>
        )}
      </Draggable>
    );
  }
}
