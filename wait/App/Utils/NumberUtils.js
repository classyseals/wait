'use strict';

let instance = null;

class NumberUtils {
  constructor() {
    if(!instance) {
      instance = this;
    }

    return instance;
  }

  removeTrailingZeroes (num) {
    const stripZeroCentsRegEx = /\.0{2}(?![\d])/;
    let resultStr = '' + num;
    return resultStr.replace(stripZeroCentsRegEx, '');
  }

  truncateDecimals (numToTruncate, totalDecimals) {
    let t = Math.pow(10, totalDecimals);
    return (Math.round((numToTruncate * t) +
        (totalDecimals > 0 ? 1 : 0) * (Math.sign(numToTruncate) *
        (10 / Math.pow(100, totalDecimals)))) / t).toFixed(totalDecimals);
  }
}

export default NumberUtils;
