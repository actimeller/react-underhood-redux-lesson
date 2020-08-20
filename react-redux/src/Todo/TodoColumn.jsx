import React from "react";
import TodoItem from "./TodoItem";

class TodoColumn extends React.PureComponent {

  render() {
    const { name, items } = this.props;
    return (
      <div className="Todo-column">
        <h2>{name}</h2>
        {items && items
          .map((item) => (
            <TodoItem key={item.id} data={item} />
          ))}
          {!items && `нет задач со статусом "${name}"`}
      </div>
    );
  }
}
export default TodoColumn;
