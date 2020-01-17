console.log(window.anychart);

let arrayOfData;
const makeCountByRaceChart = async() => {

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

const makeCountByTimeChart = async() => {

  const getCountByTime = async() => {
    return fetch('https://mult-co-jail-data.herokuapp.com/api/v1/detentions/countByTime')
      .then((response) => {
        return response.json();
      });
  };

  const data = await getCountByTime();
  data.map(hourObj => { 
    hourObj._id = (hourObj._id + 16) % 24; 
  });
  arrayOfData = data.map(function(obj) {
    return Object.keys(obj).sort().map(function(key) {
      return obj[key];
    });
  });
  data.sort((a, b) =>  a._id - b._id);
  // eslint-disable-next-line
  const chart = anychart.bar();
  // eslint-disable-next-line
  var series = chart.bar(arrayOfData);
  chart.container('timecontainer');
  chart.draw();
};


export {
  makeCountByRaceChart, makeCountByTimeChart
};

