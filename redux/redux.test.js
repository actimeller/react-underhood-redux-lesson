const { createStore, combineReducers } = require('./redux');

const initialState = {
    value: 0
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

describe("Redux должен быть инициализирован", () => {

    describe('Тестирование getState, subscribe/unsubscribe & dispatch', () => {
        it('Redux должен вернуть начальное состояние', () => {
            const store = createStore(reducer, initialState);
    
            const state = store.getState();
    
            expect(state).toEqual(initialState);
        });
    
        it('Redux должен изменить состояние после вызова dispatch с incrementAction', () => {
            const store = createStore(reducer, initialState);
    
            store.dispatch(incrementAction());
    
            expect(store.getState()).toEqual({ value: 1 });
        });
    
        it('Redux должен автоматически вызвать subscribers после изменения state', () => {
            const store = createStore(reducer, initialState);
            const listener = jest.fn();
    
            store.subscribe(listener);
            store.dispatch(incrementAction());
            store.dispatch(incrementAction());
    
            expect(store.getState()).toEqual({ value: 2 });
            expect(listener.mock.calls.length).toEqual(2);
        });
    
        it('При вызове метода возвращеенного функцией subscribe функция listener больше не должна вызываться', () => {
            const store = createStore(reducer, initialState);
            const listener = jest.fn();
    
            const unsubscribe = store.subscribe(listener);
            store.dispatch(incrementAction());
    
            unsubscribe();
    
            store.dispatch(incrementAction());
    
            expect(store.getState()).toEqual({ value: 2 });
            expect(listener.mock.calls.length).toEqual(1);
        })
    });

    describe('Тестирование middlrewares', () => {
        it('Мидлвар logger должен быть вызван один раз', () => {
            const listener = jest.fn()
            const loggerMiddleware = store => next => action => {
                console.log('dispatching', action)
                listener();
                let result = next(action)
                console.log('next state', store.getState())
                return result
            }
    
            const store = createStore(reducer, initialState, [loggerMiddleware]);
            store.dispatch(incrementAction());
    
            expect(store.getState()).toEqual({ value: 1 });
        });
    
        it('Мидлвар должен быть обернут с dispatch только один раз', () => {
            function test(spyOnMethods) {
                return methods => {
                  spyOnMethods(methods)
                  return next => action => next(action)
                }
            }
          
            const spy = jest.fn()
            
            const store = createStore(reducer, initialState, [test(spy)]);
            store.dispatch(incrementAction());
            store.dispatch(incrementAction());
    
            expect(spy.mock.calls.length).toEqual(1)
    
            expect(spy.mock.calls[0][0]).toHaveProperty('getState')
            expect(spy.mock.calls[0][0]).toHaveProperty('dispatch')
    
            expect(store.getState()).toEqual({ value: 2 });
        })
    
        it('Работает с асинхронным мидлваром', () => {
            function thunk({ dispatch, getState }) {
                return (next) => action =>
                  typeof action === 'function' ? action(dispatch, getState) : next(action)
            }
    
            const incrementActionAsync = () => (dispatch) => new Promise((resolve) => {
                setTimeout(() => {
                    resolve(dispatch(incrementAction()));
                }, 1000);
            })
    
            const store = createStore(reducer, initialState, [thunk]);
    
    
            store.dispatch(incrementAction());
    
            expect(store.getState()).toEqual({ value: 1 });
    
            store.dispatch(incrementAction());
    
            expect(store.getState()).toEqual({ value: 2 });
    
            store.dispatch(incrementActionAsync()).then(() => {
                expect(store.getState()).toEqual({ value: 3 });
            })
    
        })
    })
   
    describe('Тестирование combineReducers', () => {
        it('combineReducers вернул правильно скомбинированные редюсеры', () => {
            const reducer = combineReducers({
                counter: (state = 0, action) =>
                  action.type === 'increment' ? state + 1 : state,
                stack: (state = [], action) =>
                  action.type === 'push' ? [...state, action.value] : state
            });

            const s1 = reducer(undefined, { type: 'increment' })
            expect(s1).toEqual({ counter: 1, stack: [] })
            const s2 = reducer(s1, { type: 'push', value: 'a' })
            expect(s2).toEqual({ counter: 1, stack: ['a'] })
        });

        it('Игнорирование всех свойств которые не являются функцией', () => {
            const reducer = combineReducers({
              fake: true,
              broken: 'string',
              another: { nested: 'object' },
              stack: (state = []) => state
            })
      
            expect(Object.keys(reducer(undefined, { type: 'push' }))).toEqual([
              'stack'
            ])
          });

          it('Если редюсер возвращает undefined, должно быть создано исключение', () => {
            const reducer = combineReducers({
              counter(state = 0, action) {
                switch (action && action.type) {
                  case 'increment':
                    return state + 1
                  case 'decrement':
                    return state - 1
                  case 'whatever':
                  case null:
                  case undefined:
                    return undefined
                  default:
                    return state
                }
              }
            })
      
            expect(() => reducer({ counter: 0 }, { type: 'whatever' })).toThrow()
            expect(() => reducer({ counter: 0 }, null)).toThrow()
            expect(() =>
              reducer({ counter: 0 }, {})
            ).toThrow()
          })
    })
})