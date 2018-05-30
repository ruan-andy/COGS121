$(document).ready(() => {

  var trace1 = {
  x: [20],
  y: ['Category'],
  name: 'bbq',
  orientation: 'h',
  marker: {
    color: 'rgba(55,128,191,0.6)',
    width: 1
  },
  type: 'bar'
};

var trace2 = {
  x: [12],
  y: ['Category'],
  name: 'burger',
  orientation: 'h',
  type: 'bar',
  marker: {
    color: 'rgba(255,153,51,0.6)',
    width: 1
  }
};

var trace3 = {
  x: [10],
  y: ['Category'],
  name: 'chinese',
  orientation: 'h',
  type: 'bar',
  marker: {
    color: 'rgba(80,83,191,0.6)',
    width: 1
  }
};

var trace4 = {
  x: [12],
  y: ['Category'],
  name: 'mexican',
  orientation: 'h',
  type: 'bar',
  marker: {
    color: 'rgba(45,153,70,0.6)',
    width: 1
  }
};

var data = [trace1, trace2, trace3, trace4];

var layout = {
  title: 'Liked Restaurants',
  barmode: 'stack'
};

Plotly.newPlot('myDiv', data, layout);
});
