const Detention = require('../models/Detention');

const closeDetentions = async(bookingNumbers) => {
  const closingDetentions = await Detention
    .find()
    .exists('releaseDate', false)
    .nin('bookingNumber', bookingNumbers);
  
  await Promise.all(closingDetentions.map(async(detention) => {
    detention.releaseDate = new Date();
    await detention.save();
  }));

  return closingDetentions; 
};

module.exports = closeDetentions;
