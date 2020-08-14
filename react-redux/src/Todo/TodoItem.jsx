import React from "react";

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

export default TodoItem