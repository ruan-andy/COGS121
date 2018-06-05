/* STATISTICS.JS - Populates data visualizations based on user history */


//gets random color for plots
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

//put the user's category and likes into catLikes, preferably sorted
let catLikes = {};

function populatePlot() {
  //FIREBASE
  const database = firebase.database();
  console.log('user ' + userName);
  database.ref('users/' + userName).once('value', (snapshot) => {
    const data = snapshot.val();

    for (i in data) {
      /* Ajax request to get the name of the given ID */
      $.ajax({
        url: '/business/' + data[i],
        type: 'GET',
        dataType: 'json',
        async: false,
        success: (restaurant) => {
          for (const c of restaurant.categories) {
            //console.log(c.title);
            if (c.title in catLikes) catLikes[c.title]++;
            else catLikes[c.title] = 1;
          }
        }
      })
    }

    let catdata = [];
    for (const cat in catLikes) {
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
      catdata.push(trace);
    }
    var layout = {
      title: 'Visited Restaurants',
      barmode: 'stack'
    };

    Plotly.newPlot('myDiv', catdata, layout);
    console.log("Plotted plot!");

  });
}



$(document).ready(() => {
  //Plotly.newPlot('myDiv', data, layout);
});
