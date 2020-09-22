import memoize from "./memoize";

const createSelector = (...funcs) => {
    const resultFunc = funcs.pop();
    const dependencies = funcs;

    const memoizedResultFunc = memoize(resultFunc);

    const selector = function (...args) {
      const params = [];
      const length = dependencies.length;

      for (let i = 0; i < length; i++) {
        params.push(dependencies[i](...args));
      }

      return memoizedResultFunc(...params);
    };

    return selector;
};

export default createSelector;
