import { combineReducers } from "redux";

const INCREMENT = "INCREMENT";
const DELETE = "DELETE";
const ADD = "ADD";
const EDIT = "EDIT";
const SET_ACTIVE = "SET_ACTIVE";
const DISABLE_RENDER = "DISABLE_RENDER";

const createAction = (type) => {
  return (payload) => ({
    type, 
    payload 
   })
}

export const incrementAction = createAction(INCREMENT)

export const deleteAction = createAction(DELETE)

export const addAction = createAction(ADD)

export const editAction = createAction(EDIT)

export const setActiveAction = createAction(SET_ACTIVE)

export const disableRenderAction = createAction(DISABLE_RENDER)

export const initialState = {
  counter: 0,
  items: [],
  activeItemId: null,
  disableRender: false
};

export const incrementReducer = (state, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    default:
      return state;
  }
};

export const itemsReducer = (state, action) => {
  switch (action.type) {
    case DELETE:
      return state.filter((item) => item.id !== action.payload);
    case EDIT:
      let newState = [...state];
      (newState[newState.findIndex((el) => el.id === action.payload.id)] = action.payload)
      return newState;
    case ADD:
      return [...state, action.payload];
    default:
      return state;
  }
};

export const activeItemReducer = (state, action) => {
  switch (action.type) {
    case SET_ACTIVE:
      return action.payload;
    default:
      return state;
  }
};

export const disableRenderReducer = (state, action) => {
  switch (action.type) {
    case DISABLE_RENDER:
      return action.payload;
    default:
      return state;
  }
};

export const reducer = combineReducers({
  counter: incrementReducer,
  items: itemsReducer,
  activeItemId: activeItemReducer,
  disableRender: disableRenderReducer,
});
