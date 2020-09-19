/* eslint-disable no-console */
const { performance } = window;
const initialState = {
  summaryTime: {},
  wrongRenderCounter: 0,
  cacheUsingPercent: 0
};

const performanceOwnReact = {
  disabled: false,

  start(name) {
    if (!performance.mark) return false;
    performance.mark(`${name} start`);
  },

  end(name) {
    if (!performance.mark) return false;
    performance.mark(`${name} end`); 
  },

  measure(name) {
    if (!performance.measure) return false;
    if (this.disabled) return false;
    const { duration } = performance.measure(
      `${name} measure`,
      `${name} start`,
      `${name} end`
    );

    // запись ститастики по времени обновлений
    this.statistics.summaryTime[name] = this.statistics.summaryTime[name]
      ? this.statistics.summaryTime[name] + duration
      : duration;

    return duration;
  },

  print() {
    console.info("summary time: ", this.statistics.summaryTime);
    console.info("wrong render counter: ", this.statistics.wrongRenderCounter);
    console.info(
      "percentage of hits in the cache: ",
      this.statistics.cacheUsingPercent
    );
  },

  clear() {
    this.statistics = initialState;
  },

  startTracking() {
    this.disabled = false;
  },

  stopTracking() {
    this.disabled = true;
  },

  statistics: initialState
};

window.performanceOwnReact =
  process.env.NODE_ENV === "production" ? {} : performanceOwnReact;

export default performanceOwnReact;
