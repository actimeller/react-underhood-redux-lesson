import React from "react";
import connect from "../Connect/Connect";
import { setActiveAction, editAction, addAction } from "../Reducer/Reducer";
import getItems from "../selectors/getItems";

class TodoControls extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      status: "",
      description: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleSave(event) {
    this.props.editItem(this.state);
  }

  handleNew(event) {
    this.props.setActiveItemId(Date.now());
  }

  handleAdd(event) {
    this.props.addItem(this.state);
  }

  handleChange(event) {
    let { name: fieldName, value } = event.target;
    this.setState({
      [fieldName]: value,
    });
  }

  componentDidUpdate() {
    const { items, activeItemId } = this.props;
    if (this.state.id !== activeItemId) {
      const activeItem = items.find((item) => item.id === activeItemId);
      this.setState(activeItem || { id: activeItemId });
    }
  }

  render() {
    const { activeItemId, items } = this.props;
    if (activeItemId == null)
      return (
        <div>
          <button type="button" onClick={this.handleNew}>
            Add new
          </button>
        </div>
      );
    return (
      <div className="Todo-controls">
        <input
          type="text"
          placeholder="todo name"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <select
          value={this.state.type}
          name="status"
          onChange={this.handleChange}
        >
          <option value="">статус</option>
          <option value="done">сделано</option>
          <option value="notDone">не сделано</option>
          <option value="planned">запланировано</option>
        </select>
        <textarea
          name="description"
          cols="30"
          rows="10"
          placeholder="todo description"
          value={this.state.description}
          onChange={this.handleChange}
        ></textarea>
        <div>
          {items.findIndex((el) => el.id === activeItemId) !== -1 ? (
            <button type="button" onClick={this.handleSave}>
              save
            </button>
          ) : (
            <button type="button" onClick={this.handleAdd}>
              add
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  ({ items, activeItemId }) => ({
    items: getItems({items}),
    activeItemId,
  }),
  (dispatch) => ({
    editItem: (item) => {
      dispatch(editAction(item));
    },
    addItem: (item) => {
      dispatch(addAction(item));
    },
    setActiveItemId: (id) => {
      dispatch(setActiveAction(id));
    },
  })
)(TodoControls);
