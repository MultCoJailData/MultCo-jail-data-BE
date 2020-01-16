// create data
var data = [
  ['African American', 8269],
  ['Asian', 580],
  ['Latino', 2006],
  ['White', 638],
];

// create a chart
// eslint-disable-next-line
const chart = anychart.bar();

// create a bar series and set the data
// eslint-disable-next-line
var series = chart.bar(data);

// set the container id
chart.container('container');

// initiate drawing the chart
chart.draw();
