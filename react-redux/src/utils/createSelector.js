import memoize from "./memoize";

const createSelector = (...funcs) => {
    const resultFunc = funcs.pop();
    const dependencies = funcs;

    const memoizedResultFunc = memoize(function () {
      return resultFunc.apply(null, arguments);
    });

    const selector = memoize(function () {
      const params = [];
      const length = dependencies.length;

      for (let i = 0; i < length; i++) {
        params.push(dependencies[i].apply(null, arguments));
      }

      return memoizedResultFunc.apply(null, params);
    });

    return selector;
};

export default createSelector;
