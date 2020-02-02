const Detention = require('../models/Detention');
const closeDetentions = async(bookingNumbers) => {
  const closingDetentions = await Detention
    .find()
    .exists('releaseDate', false)
    .nin('bookingNumber', bookingNumbers);

  // no need for async/await in the map function
  await Promise.all(closingDetentions.map(detention => {
    detention.releaseDate = new Date();
    return detention.save();
  }));

  return closingDetentions;
};

module.exports = closeDetentions;
