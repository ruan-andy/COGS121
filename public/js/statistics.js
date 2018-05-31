function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

//put the user's category and likes into catLikes, preferably sorted
let catLikes = {'bbq':20,'burger':12, 'chinese':10, 'mexican':7};

let data=[];
for(const cat in catLikes) {
  let trace = {
    x: [catLikes[cat]],
    y: ['Category'],
    name: cat,
    orientation: 'h',
    marker: {
      color: getRandomColor(),
      width: 1
    },
    type: 'bar'
  };
  data.push(trace);
}

var layout = {
  title: 'Liked Restaurants',
  barmode: 'stack'
};

$(document).ready(() => {
  Plotly.newPlot('myDiv', data, layout);
});
