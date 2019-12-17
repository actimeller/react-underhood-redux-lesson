import React from 'react';
import { createStore } from 'redux';
import { reducer, initialState } from './Reducer/Reducer';
import Counter from './Counter/Counter';
import Provider from './Provider/Provider';

const store = createStore(reducer, initialState)

function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  )
}

export default App;
