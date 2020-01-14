const superagent = require('superagent');
require('superagent-retry-delay')(superagent);
const Throttle = require('superagent-throttle');
const cheerio = require('cheerio');

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
      const $ = cheerio.load(res);
      const booking = {
        bookingNumber: $('#BookingNumber').attr('value'),
        swisId: $('label[for="Person_SwisID"]').parent().next().text(),
        fullName:$('label[for="Person_FullName"]').parent().next().text(),
        age: $('label[for="Person_Age"]').parent().next().text(),
        gender: $('label[for="Person_Gender"]').parent().next().text(),
        race: $('label[for="Person_Race"]').parent().next().text(),
        height: $('label[for="Person_Height"]').parent().next().text(),
        weight: $('label[for="Person_Weight"]').parent().next().text(),
        hairColor: $('label[for="Person_HairColor"]').parent().next().text(),
        eyeColor: $('label[for="Person_EyeColor"]').parent().next().text(),
        arrestingAgency: $('label[for="ArrestingAgency"]').parent().next().text(),
        bookingDate: $('label[for="BookingDateTime"]').parent().next().text(),
        assignedFacility: $('label[for="AssignedFacility"]').parent().next().text(),
        projectedReleaseDate: $('label[for="ProjectedReleaseDateTime"]').parent().next().text(),
      };
      const cases = [];
      $('#charge-info > h3').each(function() {
        const caseInfo = {
          courtCaseNumber: $('.court-case-number > b', this).text(),
          daCaseNumber: $('.da-case-number > b', this).text(),
          citationNumber: $('.citation-number > b', this).text(),
          charges: []
        };

        $(this).next().find('li').each(function() {
          const charge = {
            description: $('.charge-description-display', this).text(),
            bail: $('.charge-bail-display > span', this).text(),
            status: $('.charge-status-display > span', this).text() 
          };
          caseInfo.charges.push(charge);
        });
        cases.push(caseInfo);
      });
      booking.cases = cases;
      return booking;
    })
    .catch(() => {
      throw new Error(`error with fetching ${bookingNumber}`);
    });
};

module.exports = {
  scrapeBooking
};

  
