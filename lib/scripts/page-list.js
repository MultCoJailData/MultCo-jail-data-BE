const superagent = require('superagent');
const cheerio = require('cheerio');

const url = 'http://www.mcso.us/PAID/Home/SearchResults';

const bookingNumberList = async() => {
  return superagent
    .post(url)
    .then(res => {
      return res.text;
    })
    .then(res => {
      const $ = cheerio.load(res);
      const pageUrls = [];
      $('tr > td > a ').each(function() {
        pageUrls.push($(this).attr('href').slice(19));
      });
      return pageUrls;
    });
};
      
module.exports = { 
  bookingNumberList
};
