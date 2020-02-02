const cheerio = require('cheerio');
const { findRecentCase, sliceCaseNumber } = require('../scripts/recent-case-finder');

// little helper function to help make your code a bit more DRY
const labelFinder = label => $(`label[for="${label}"]`).parent().next().text()

const scrapeHTML = (html) => {
  const $ = cheerio.load(html);
  const booking = {
    bookingNumber: $('#BookingNumber').attr('value'),
    swisId: labelFinder('Person_SwisID'),
    fullName:labelFinder('Person_FullName'),
    age: labelFinder('Person_Age'),
    gender: labelFinder('Person_Gender'),
    race: labelFinder('Person_Race'),
    height: labelFinder('Person_Height'),
    weight: labelFinder('Person_Weight'),
    hairColor: labelFinder('Person_HairColor'),
    eyeColor: labelFinder('Person_EyeColor'),
    arrestingAgency: labelFinder('ArrestingAgency'),
    bookingDate: labelFinder('BookingDateTime'),
    assignedFacility: labelFinder('AssignedFacility'),
    projectedReleaseDate: labelFinder('ProjectedReleaseDateTime'),
  };
  const cases = [];
  const caseNumbers = [];
  $('#charge-info > h3').each(function() {
    caseNumbers.push($('.court-case-number > b', this).text());
    const caseInfo = {
      caseNumber: $('.court-case-number > b', this).text(),
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
    let caseNumber = caseInfo.caseNumber;
    if(sliceCaseNumber(caseNumber) === recent){
      cases.push(caseInfo);
    }

  });

  if(cases.length === 0) console.log(cases, booking.bookingNumber);

  booking.case = cases[0];
  return booking;
};

module.exports = scrapeHTML;
