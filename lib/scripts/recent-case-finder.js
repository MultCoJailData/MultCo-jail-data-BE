const sliceCaseNumber = (number) => {
  let slicedNumber = number.slice(0, 2) + number.slice(4);
  return slicedNumber;
};

const findRecentCase = (array) => {
  let slicedArray = [];
  array.forEach(number => {
    slicedArray.push(sliceCaseNumber(number));
  });
  return Math.max.apply(null, slicedArray);
};

module.exports = {
  findRecentCase,
  sliceCaseNumber
};

