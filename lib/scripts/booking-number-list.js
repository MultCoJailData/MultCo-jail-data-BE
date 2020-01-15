const superagent = require('superagent');
const cheerio = require('cheerio');
const closeDetentions = require('./close-detentions');

const url = 'http://www.mcso.us/PAID/Home/SearchResults';

const bookingNumberList = async() => {
  const text = await superagent.post(url);
  const $ = cheerio.load(text);
  const bookingNumbers = [];
  $('tr > td > a ').each(function() {
    bookingNumbers.push($(this).attr('href').slice(19));
  });
  await closeDetentions(bookingNumbers);
  return bookingNumbers;
};
      
module.exports = bookingNumberList;


