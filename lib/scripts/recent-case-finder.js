const sliceCaseNumber = (number) => {
  try {
    let slicedNumber = Number(number.slice(0, 2) + number.slice(4));
    return isNaN(slicedNumber) ? -1 : slicedNumber;

  } catch(err) {
    return -1;
  }
};

const findRecentCase = (array) => {
  // you can spread an array as args now.
  // no need to use apply any more for this use case
  // also map is a better choice here since you are creating
  // an array
  return Math.max(...array.map(sliceCaseNumber(number)));
};

module.exports = {
  findRecentCase,
  sliceCaseNumber
};
