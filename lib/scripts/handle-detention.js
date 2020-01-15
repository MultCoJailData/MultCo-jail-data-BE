const BookingState = require('../models/BookingState');
const Detention = require('../models/Detention');

const handleDetention = async(scrape, newBookingState, personId) => {
  let detention = await Detention.findOne({ 
    bookingNumber: scrape.bookingNumber });
  if(!detention) {
    detention = await Detention.create({
      bookingNumber: scrape.bookingNumber,
      bookingDate: scrape.bookingDate,
      releaseDate: scrape.releaseDate,
      person: personId,
      arrestingAgency: scrape.arrestingAgency,
    });
  }
  const lastBooking = await BookingState.findById(detention.currentBookingState);
  let lastBookingObj;
  if(lastBooking) {
    lastBookingObj = lastBooking.toObject();
  }
  const newBookingObj = newBookingState.toObject();
  delete newBookingObj._id; 
  delete newBookingObj.dateAdded;
  if(lastBookingObj) {
    delete lastBookingObj._id;
    delete lastBookingObj.dateAdded;
  }
  if(!(JSON.stringify(newBookingObj) === JSON.stringify(lastBookingObj))) {
    detention.bookingStates.push(newBookingState._id);
    detention.currentBookingState = newBookingState._id;
  }

  detention.save();
  return detention;
};

module.exports = handleDetention;

