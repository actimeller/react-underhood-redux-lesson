import React from 'react';
import { createStore } from 'redux';
import * as rtl from '@testing-library/react'
import connect from './Connect';
import Provider from '../Provider/Provider';

const initialState = {
    value: 0,
    user: {
        name: 'test'
    }
}
const INCREMENT = "INCREMENT";

const incrementAction = () => ({
    type: INCREMENT,
});

const reducer = (state, action) => {
    switch(action.type) {
        case INCREMENT:
            return { ...state, value: state.value + 1 }
        default:
            return state;
    }
}

describe('Тестирование connect', () => {
    beforeEach(() => rtl.cleanup());

    it('mapStateToProps должен прокинуть необходимые данные в компонент', () => {
        const store = createStore(reducer, initialState);
        const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
        const Child = ({ name }) => (
            <div data-testId="store">
                { `name - ${name}` }
            </div>
        )

        const ConnectedChild = connect((state) => ({
            name: state.user.name
        }))(Child);

        const tester = rtl.render(
            <Provider store={store}>
              <ConnectedChild />
            </Provider>
        )
        spy.mockRestore();
        expect(tester.getByTestId('store').textContent).toBe(
            'name - test'
        )
    });

    it('mapDispatchToProps должен обрабатываться и данные в компоненте должны обновиться после изменения store', () => {
        const store = createStore(reducer, initialState);
        const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
        const Child = ({ increment, value }) => {
            React.useEffect(() => {
                increment();
            }, []);

            return(
                <div data-testId="store">
                    { `value - ${value}` }
                </div>
            );
        }

        const ConnectedChild = connect(
            (state) => ({
                value: state.value
            }),
            (dispatch) => ({
                increment:  () => dispatch(incrementAction()) 
            })
        )(Child);

        const tester = rtl.render(
            <Provider store={store}>
                <ConnectedChild />
            </Provider>
        )

        spy.mockRestore();
        expect(tester.getByTestId('store').textContent).toBe(
            'value - 1'
        )
    });
})