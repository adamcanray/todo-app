import { styled } from "@mui/system";
import React, { Component, PureComponent } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { TaskCard } from "..";
import { TTask } from "../../../application/model";

const Container = styled("div")(() => ({
  margin: "8px",
  border: "1px solid lightgrey",
  borderRadius: "2px",
  backgroundColor: "white",
  width: "220px",
  display: "flex",
  flexDirection: "column",
}));

const Title = styled("h3")(() => ({
  padding: "8px",
}));

interface IPropsTaskList {
  isDraggingOver: boolean;
}

const TaskList = styled("div")((props: IPropsTaskList) => ({
  padding: "8px",
  backgroundColor: `${props.isDraggingOver ? "gray" : "inherit"}`,
  flexGrow: "1",
  minHeight: "100px",
}));

interface IPropsInnerList {
  tasks: Array<TTask>;
}

interface IStateInnerList {}

class InnerList extends PureComponent<IPropsInnerList, IStateInnerList> {
  render() {
    return this.props.tasks.map((task, index) => (
      <TaskCard key={task.id} task={task} index={index} />
    ));
  }
}

interface IPropsColumn {
  column: any;
  tasks: Array<TTask>;
  index: number;
}

interface IStateColum {}

export default class Column extends Component<IPropsColumn, IStateColum> {
  render() {
    return (
      <Draggable draggableId={this.props.column.id} index={this.props.index}>
        {(provided) => (
          <Container {...provided.draggableProps} ref={provided.innerRef}>
            <Title {...provided.dragHandleProps}>
              {this.props.column.title}
            </Title>
            <Droppable droppableId={this.props.column.id} type="task">
              {(provided, snapshot) => (
                <TaskList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  <InnerList tasks={this.props.tasks} />
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    );
  }
}
