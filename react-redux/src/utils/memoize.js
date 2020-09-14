import performanceOwnReact from "./performanceOwnReact";

const CACHE_SIZE = 2;

const memoize = fn => {
  const cache = {};
  let memoizeUsingCounter = 0;
  let cacheUsingCounter = 0;

  const getLeastFrequentlyUsed = () => {
    const list = Object.entries(cache).sort((a, b) => a[1].usage - b[1].usage);
    return list[0][0];
  };

  const getValueFromCache = args => {
    const stringifiedArgs = JSON.stringify(args);

    if (cache[stringifiedArgs]) {
      cacheUsingCounter += 1;
      cache[stringifiedArgs].usage += 1;
      return cache[stringifiedArgs].value;
    }
    if (Object.keys(cache).length >= CACHE_SIZE) {
      delete cache[getLeastFrequentlyUsed()];
    }
    const result = fn(...args);
    cache[stringifiedArgs] = {
      value: result,
      usage: 0
    };
    return result;
  };

  return (...args) => {
    performanceOwnReact.start(`Memoize`);
    memoizeUsingCounter += 1;
    const result = getValueFromCache(args);
    performanceOwnReact.end(`Memoize`);
    performanceOwnReact.measure(`Memoize`);
    performanceOwnReact.statistics.cacheUsingPercent =
      (cacheUsingCounter / memoizeUsingCounter) * 100;
    return result;
  };
};

export default memoize;
