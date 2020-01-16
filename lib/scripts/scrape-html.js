const cheerio = require('cheerio');
const { findRecentCase, sliceCaseNumber } = require('../scripts/recent-case-finder');

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
  let caseNumbers = [];
  $('#charge-info > h3').each(function() {
    caseNumbers.push($('.court-case-number > b', this).text());
    const caseInfo = {
      courtCaseNumber: $('.court-case-number > b', this).text(),
      daCaseNumber: $('.da-case-number > b', this).text(),
      citationNumber: $('.citation-number > b', this).text(),
      charges: []
    };

    $(this).next().find('li').each(function() {
      const charge = {
        description: $('.charge-description-display', this).text(),
        bail: $('.charge-bail-display > span', this).text()
          .split('')
          .filter(char => !'$,'.includes(char))
          .join(''),
        status: $('.charge-status-display > span', this).text()
      };
      caseInfo.charges.push(charge);
    });

    let recent = findRecentCase(caseNumbers);
    let caseNumber = caseInfo.courtCaseNumber;

    if(sliceCaseNumber(caseNumber) === recent){
      cases.push(caseInfo);
    }

  });

  if(cases.length === 0) console.log(cases, booking.bookingNumber);
  
  booking.case = cases[0];
  return booking;
};

module.exports = scrapeHTML;
