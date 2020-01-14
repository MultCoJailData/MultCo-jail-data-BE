const scrapeBooking = require('./scrape-booking');

const generateError = async() => {
  await scrapeBooking('123');
};

generateError();
