const observe = (original, cb) => {
  const newFunc = function (...args) {
    const result = original.call(this, ...args);
    if (typeof this?.then === "function") {
      return result.then(v => cb({ result: v, err: null }, ...args))
                   .catch(err => cb({ result: null, err }, ...args));
    }

    try {
      return cb({ result, err: null }, ...args);
    } catch (err) {
      return cb({ result: null, err }, ...args);
    }
  }
  newFunc.toString = original.toString;
  return newFunc;
};

export default observe;
