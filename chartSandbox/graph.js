let arrayOfData;
const makeCharts = async() => {

  const getCountByRace = async() => {
    return fetch('https://mult-co-jail-data.herokuapp.com/api/v1/persons/countbyrace')
      .then((response) => {
        return response.json();
      });
  };

  const data = await getCountByRace();
  arrayOfData = data.map(function(obj) {
    return Object.keys(obj).sort().map(function(key) {
      return obj[key];
    });
  });
  // eslint-disable-next-line
  const chart = anychart.bar();
  // create a bar series and set the data
  // eslint-disable-next-line
  var series = chart.bar(arrayOfData);
  // set the container id
  chart.container('container');
  // initiate drawing the chart
  chart.draw();
};
makeCharts();
