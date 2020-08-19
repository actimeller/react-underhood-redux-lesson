module.exports = {
  applyMiddleware(store, middlewares) {
    let dispatch = store.dispatch;
    middlewares.forEach((middleware) => {
      dispatch = middleware(store)(dispatch);
    });
    return {
      ...store,
      dispatch,
    };
  },

  createStore(reducer, initialState, middlewares) {
    let store = new Redux(reducer, initialState);
    if (middlewares) module.exports.applyMiddleware(store, middlewares);
    return store;
  },

  combineReducers(reducers) {
    return (state = {}, action) => {
      const nextState = {};
      Object.entries(reducers).forEach(([key, fn]) => {
        if (typeof fn !== "function") return;
        const result = fn(state[key], action);
        if (typeof result === "undefined")
          throw new TypeError(`An undefined reducer!`);
        nextState[key] = result;
      });
      return nextState;
    };
  },
};

class Redux {
  constructor(reducer, initialState) {
    this.reducer = reducer.bind(this);
    this.state = initialState || reducer();
    this.subscribers = [];
  }
  getState() {
    return this.state;
  }

  dispatch(action) {
    this.state = this.reducer(this.state, action);
    this.subscribers.forEach((fn) => fn(this.state));
    if (typeof action === "function") return action(this.state);
  }

  subscribe(fn) {
    this.subscribers.push(fn);

    return () => {
      this.subscribers = this.subscribers.filter(
        (subscriber) => subscriber !== fn
      );
    };
  }

  unsubscribe(fn) {
    // здесь должна быть реализация
  }
}
