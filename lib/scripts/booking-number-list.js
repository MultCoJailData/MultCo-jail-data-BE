const superagent = require('superagent');
const cheerio = require('cheerio');
const closeDetentions = require('./close-detentions');

const url = 'http://www.mcso.us/PAID/Home/SearchResults';

const bookingNumberList = async() => {
  const res = await superagent.post(url)
    .timeout(60000);

  const $ = cheerio.load(res.text);
  const bookingNumbers = [];
  $('tr > td > a').each(function() {
    bookingNumbers.push($(this).attr('href').slice(19));
  });
  console.log(bookingNumbers);
  
  await closeDetentions(bookingNumbers);
  return bookingNumbers;
};
     
module.exports = bookingNumberList;


