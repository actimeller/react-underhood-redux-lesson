import React from 'react';
import { createStore } from 'redux';
import { reducer, initialState } from './Reducer/Reducer';
import Counter from './Counter/Counter';
import Todo from './Todo/Todo';
import Provider from './Provider/Provider';

const store = createStore(reducer, initialState)

function App() {
  return (
    <Provider store={store}>
      <Counter />
      <Todo />
    </Provider>
  )
}

export default App;
