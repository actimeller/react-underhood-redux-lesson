import React from "react";
import connect from "../Connect/Connect";
import TodoColumn from "./TodoColumn";
import getItems from "../selectors/getItems";

function TodoContent({ plannedItems, done, notDone }) {
  // console.info( plannedItems, done, notDone);
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
    plannedItems: getItems({items}).filter((item) => item.status === "planned"),
    done: getItems({items}).filter((item) => item.status === "done"),
    notDone: getItems({items}).filter((item) => item.status === "notDone")
   })
)(TodoContent);
