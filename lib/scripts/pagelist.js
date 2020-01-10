const superagent = require('superagent');
const cheerio = require('cheerio');

const url = 'http://www.mcso.us/PAID/Home/SearchResults';

const getPageList = async() => {
  return superagent
    .post(url)
    .then(res => {
      // console.log(res.text);
      
      return res.text;
       })
       .then(res => {
        const $ = cheerio.load(res);
        const pageUrls = [];
        $('tr > td > a ').each(function() {
          pageUrls.push($(this).attr('href').slice(19));

        });
        console.log(pageUrls);
       })
  };
      
      getPageList();

module.exports = { 
  getPageList
}
