const scrapeHTML = require('./scrape-html');
const superagent = require('superagent');
require('superagent-retry-delay')(superagent);
const Throttle = require('superagent-throttle');
require('superagent-retry-delay')(superagent);

let throttle = new Throttle({
  active: true,     // set false to pause queue
  rate: 5,          // how many requests can be sent every `ratePer`
  ratePer: 10000,   // number of ms in which `rate` requests may be sent
  concurrent: 1     // how many requests can be sent concurrently
});


const scrapeBooking = async(bookingNumber) => {

  const url = `http://www.mcso.us/PAID/Home/Booking/${bookingNumber}`;

  return superagent
    .get(url)
    .use(throttle.plugin())
    .retry(5, [3000, 5000, 10000, 10800000, 43200000])
    .then(res => {
      return res.text;
    })
    .then(res => {
      return scrapeHTML(res);
    })
    .catch((err) => {
      throw new Error(`error with fetching ${bookingNumber}`);
    });
};

module.exports = scrapeBooking;
