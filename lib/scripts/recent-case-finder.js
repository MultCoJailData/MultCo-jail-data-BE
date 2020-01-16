const sliceCaseNumber = (number) => {
  try {
    let slicedNumber = Number(number.slice(0, 2) + number.slice(4));
    return isNaN(slicedNumber) ? -1 : slicedNumber;

  } catch(err) {
    return -1;
  }
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

