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
function populatePlot () {
  //DATABASE
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
          /*for (t in getTags(restaurant.categories)) {
            if (t in catLikes) console.log("Im in it");
            else console.log("Tag not in catlikes");
          }*/

          /*$('#history_list').append('<li>' + restaurant.name + '<br>' +
          '<img src=\"' + restaurant.image_url + '\"' + 'width=300px' + '/>' + '</li>');*/
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
    //mymap.setView(markersLayer.getBounds().getCenter());
  });
}



$(document).ready(() => {
  //Plotly.newPlot('myDiv', data, layout);
});
