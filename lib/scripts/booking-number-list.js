const superagent = require('superagent');
require('superagent-retry-delay')(superagent);
const cheerio = require('cheerio');
const closeDetentions = require('./close-detentions');

const url = 'http://www.mcso.us/PAID/Home/SearchResults';

const bookingNumberList = async() => {
  const res = await superagent.post(url)
    .timeout(60000)
    .retry(10, [3000, 5000, 8000, 13000, 21000, 34000, 55000, 89000, 144000, 233000]);

  const $ = cheerio.load(res.text);
  const bookingNumbers = [];
  $('tr > td > a').each(function() {
    bookingNumbers.push($(this).attr('href').slice(19));
  });
  
  await closeDetentions(bookingNumbers);
  return bookingNumbers;
};

module.exports = bookingNumberList;


