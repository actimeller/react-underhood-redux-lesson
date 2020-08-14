import React from "react";
import connect from "../Connect/Connect";
import { deleteAction, setActiveAction } from "../Reducer/Reducer";
import TodoItem from "./TodoItem";

function TodoContent({ items, deleteItem, setActiveItemId }) {
  if (!items) return null;
  return (
    <div className="Todo-content">
      <div className="Todo-column">
        <h2>запланировано</h2>
        {items
          .filter((item) => item.type === "planned")
          .map((item) => (
            <TodoItem key={item.id} data={item} deleteItem={deleteItem} setActiveItemId={setActiveItemId}/>
          ))}
      </div>
      <div className="Todo-column">
        <h2>сделано</h2>
        {items
          .filter((item) => item.type === "done")
          .map((item) => (
            <TodoItem key={item.id} data={item} deleteItem={deleteItem} setActiveItemId={setActiveItemId}/>
          ))}
      </div>
      <div className="Todo-column">
        <h2>не сделано</h2>
        {items
          .filter((item) => item.type === "notDone")
          .map((item) => (
            <TodoItem key={item.id} data={item} deleteItem={deleteItem} setActiveItemId={setActiveItemId}/>
          ))}
      </div>
    </div>
  );
}

export default connect(
  ({ items }) => ({ items }),
  (dispatch) => ({
    deleteItem: (id) => {
      dispatch(deleteAction(id));
    },
    setActiveItemId: (id) => {
      dispatch(setActiveAction(id));
    },

  })
)(TodoContent);
