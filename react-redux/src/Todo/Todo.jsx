import React from "react";
import TodoContent from "./TodoContent";
import TodoControls from "./TodoControls";

function Todo(props) {
  return (
    <div className="Todo">
      <TodoControls />
      <TodoContent />
    </div>
  );
}

export default Todo;
