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
        age: $('label[for="Person_Age"]').parent().next().text(),
        gender: $('label[for="Person_Gender"]').parent().next().text(),
        race: $('label[for="Person_Race"]').parent().next().text(),
        height: $('label[for="Person_Height"]').parent().next().text(),
        weight: $('label[for="Person_Weight"]').parent().next().text(),
        hairColor: $('label[for="Person_HairColor"]').parent().next().text(),
        eyeColor: $('label[for="Person_EyeColor"]').parent().next().text(),
        arrestingAgency: $('label[for="ArrestingAgency"]').parent().next().text(),
        bookingDateTime: $('label[for="BookingDateTime"]').parent().next().text(),
        assignedFacility: $('label[for="AssignedFacility"]').parent().next().text(),
        projectedReleaseDateTime: $('label[for="ProjectedReleaseDateTime"]').parent().next().text()










      };
    
      console.log(booking);
    })
    .catch(console.error);
};

getStuff();
  
