import React from "react";
import connect from "../Connect/Connect";
import TodoColumn from "./TodoColumn";

function TodoContent({ plannedItems, done, notDone }) {
  return (
    <div className="Todo-content">
      <TodoColumn name="запланировано" items={plannedItems}/>
      <TodoColumn name="сделано" items={done}/>
      <TodoColumn name="не сделано" items={notDone}/>
    </div>
  );
}

export default connect(
  ({ items }) => ({ 
    plannedItems: items.filter((item) => item.status === "planned"),
    done: items.filter((item) => item.status === "done"),
    notDone: items.filter((item) => item.status === "notDone")
   })
)(TodoContent);
