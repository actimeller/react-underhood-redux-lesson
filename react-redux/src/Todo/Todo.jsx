import React from "react";
import TodoContent from "./TodoContent";
import TodoControls from "./TodoControls";
import connect from "../Connect/Connect";
import { addAction, editAction, disableRenderAction } from "../Reducer/Reducer";
import createSelector from "../utils/createSelector";
import response from "../items.json";

class Todo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getItems = this.getItems.bind(this);
  }
  getItems = () => {
    Promise.resolve().then(() => {
      this.props.disableRender(true);
      try {
        [...response, ...this.props.items].forEach((item) => {
          if (Math.random() >= 0.5 && item.status === "planned")
            item.status = "done";
          this.props.items.find((x) => x.id === item.id)
            ? this.props.editItem(item)
            : this.props.addItem(item);
        });
      } finally {
        this.props.disableRender(false);
      }
    });
  };
  componentDidMount() {
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
  (store) => {
    return {
      items: createSelector(
        ({ items }) => items,
        (items) => items
      )(store),
    };
  },

  (dispatch) => ({
    addItem: (item) => {
      dispatch(addAction(item));
    },
    editItem: (item) => {
      dispatch(editAction(item));
    },
    disableRender: (disable) => {
      dispatch(disableRenderAction(disable));
    },
  })
)(Todo);
