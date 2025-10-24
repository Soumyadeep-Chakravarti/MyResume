// src/utils/Throttle.js - ENHANCED FOR TRAILING EDGE

const throttle = (func, limit) => {
  let timeoutId = null;
  let lastArgs = null;
  let lastThis = null;

  return function () {
    const context = this;
    const args = arguments;

    if (timeoutId) {
      // 1. If currently throttled, save the latest call arguments
      lastArgs = args;
      lastThis = context;
    } else {
      // 2. Execute immediately on the leading edge
      func.apply(context, args);

      // 3. Start the timer
      timeoutId = setTimeout(() => {
        // 4. Trailing Edge: If arguments were saved, execute the function one last time
        if (lastArgs) {
          func.apply(lastThis, lastArgs);
          lastArgs = null;
          lastThis = null;
        }
        // Reset the timer and allow leading edge execution again
        timeoutId = null;
      }, limit);
    }
  };
};

export default throttle;
