const superagent = require('superagent');
require('superagent-retry-delay')(superagent);
const cheerio = require('cheerio');
const Throttle = require('superagent-throttle');
const closeDetentions = require('./close-detentions');


let throttle = new Throttle({
  active: true, 
  rate: 5,      
  ratePer: 10000,
  concurrent: 5
});

const scrapeBookingNumbers = () => {

  return superagent
    .post('http://www.mcso.us/PAID/Home/SearchResults')
    .use(throttle.plugin())
    .retry(10, [2000], [401, 404])
    .then(res => cheerio.load(res.text))
    .then(getBookingNumbers)
    .then(closeDetentions())
    .catch(error => console.log(error)); 
};

const getBookingNumbers = html => {
  return html('tr a')
    .map((_, el) => html(el).attr('href').slice(19)).get();
};
  
// scrapeBookingNumbers()
//   .then(results => console.log(results));
     
module.exports = scrapeBookingNumbers;


