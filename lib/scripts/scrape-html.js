const cheerio = require('cheerio');

const scrapeHTML = (html) => {
  const $ = cheerio.load(html);
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
    let caseNumber = $('.court-case-number > b', this).text().slice(2, 4);
    console.log(caseNumber);
    let numberArray = [];
    numberArray.push(caseNumber);
    const caseInfo = {
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
    if(caseNumber === (Math.max.apply(null, numberArray))){
      caseInfo.courtCaseNumber = caseNumber;
    }
    cases.push(caseInfo);
  });
  booking.cases = cases;
  return booking;
};

module.exports = scrapeHTML;
