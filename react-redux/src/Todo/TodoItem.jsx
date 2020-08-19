import React from "react";
import connect from "../Connect/Connect";
import { deleteAction, setActiveAction } from "../Reducer/Reducer";

function TodoItem({ data, deleteItem, setActiveItemId }) {
  const { name, description, id } = data;
  const handleDelete = (event) => {
    event.stopPropagation();
    deleteItem(id)
  }
  return (
    <div className="Todo-item" onClick={()=>setActiveItemId(id)}>
      <button type="button" onClick={handleDelete}>x</button>
      <h4>{name}</h4>
      <p>{description}</p>
    </div>
  );
}


export default connect(
  null,
  (dispatch) => ({
    deleteItem: (id) => {
      dispatch(deleteAction(id));
    },
    setActiveItemId: (id) => {
      dispatch(setActiveAction(id));
    },
  })
)(TodoItem);
