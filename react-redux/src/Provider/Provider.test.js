import React from 'react';
import { createStore } from 'redux';
import * as rtl from '@testing-library/react'
import Provider, { ReactReduxContext } from './Provider';

const createExampleTextReducer = () => (state = 'example text') => state

describe('Тестирование Provider', () => {
  beforeEach(() => rtl.cleanup());
  
  const Child = () => (
    <ReactReduxContext.Consumer>
      { store => {
        return(
          <div data-testId="store">
            { `store - ${store.getState()}` }
          </div>
        )
      }}
    </ReactReduxContext.Consumer>
  )

    it('Стор должен быть добавлен в контекст', () => {
      const store = createStore(createExampleTextReducer())
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {})

      const tester = rtl.render(
        <Provider store={store}>
          <Child />
        </Provider>
      )
      spy.mockRestore()
  
      expect(tester.getByTestId('store').textContent).toBe(
        'store - example text'
      )
    }) 
  })