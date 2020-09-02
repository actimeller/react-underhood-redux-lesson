import React from "react";
import TodoContent from "./TodoContent";
import TodoControls from "./TodoControls";
import connect from "../Connect/Connect";
import { addAction, editAction } from "../Reducer/Reducer";
import response from "../items.json";

class Todo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getItems = this.getItems.bind(this);
  }
  getItems = () => {
    response.forEach((item) => {
      if (Math.random() >= 0.5) item.status = "done"
      this.props.items.find((x) => x.id === item.id)
        ? this.props.editItem(item)
        : this.props.addItem(item);
    });
  };
  componentWillMount() {
    setInterval(this.getItems, 2000);
  }
  render() {
    return (
      <div className="Todo">
        <TodoControls />
        <TodoContent />
      </div>
    );
  }
}

export default connect(
  ({ items }) => ({ items }),
  (dispatch) => ({
    addItem: (item) => {
      dispatch(addAction(item));
    },
    editItem: (item) => {
      dispatch(editAction(item));
    },
  })
)(Todo);
