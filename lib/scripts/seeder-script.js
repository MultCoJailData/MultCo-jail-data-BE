const superagent = require('superagent');
const cheerio = require('cheerio');

const url = 'http://www.mcso.us/PAID/Home/Booking/1492336/1501779';

const getStuff = async() => {
  return superagent
    .get(url)
    .then(res => {
      return res.text;
    })
    .then(res => {
      const $ = cheerio.load(res);
      const booking = {
        bookingNumber: $('#BookingNumber').attr('value'),
        swisId: $('label[for="Person_SwisID"]').parent().next().text(),
        fullName:$('label[for="Person_FullName"]').parent().next().text(),
        // age: $('Person_Age')
      };
    
      console.log(booking);
    })
    .catch(console.error);
};

getStuff();
  
