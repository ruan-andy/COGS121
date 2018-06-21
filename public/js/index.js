/* INDEX.JS - Gets recommendations based on history, get new restaurants for discover section, and implements search bar autocomplete */

$(document).ready(() => {
  const database = firebase.database();
  $('#addButton').hide();
  $('#hideButton').hide();
  //	$('#s_hideButton').hide();
  $('#storeBox').hide();
  $('#discoverBox').hide();
  $('#profileInfo').hide();
  $('#glogout').hide();
  $('#searchResultBox').hide();
  $('#alertsuccess').hide();

  console.log('user ' + userName);
  let prevNum = 0;
  let businessID;
  let rbusinessID;
  let dbusinessID;
  let restaurantID;

  let city;

  function getRandInteger(min, max) {
    let num = 0;
    do {
      num = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (prevNum == num)
    prevNum = num;
    return num + '';
  }

  /* Concatenate the array of tags */
  function getTags(categories) {
    let str = '';
    //append each categories to the string
    for (const c of categories) {
      str = str + c.title + '; ';
    }
    return str;
  }

  function getNewRec() {
    database.ref('users/' + userName).once('value', (snapshot) => {
      const data = snapshot.val();
      console.log(userName);
      //check if the user has liked any restaurant
      if (!(snapshot.exists()) || userName === 'none') {
        $('#r_recom-data').html("You have no liked restaurants. Discover new cuisine.");
        return;
      }

      //array of all the restaurants
      let restArr = Object.keys(data);
      let randCat;

      /* Ajax request to pick a random category from a random restaurant */
      $.ajax({
        //pick a random restaurant from the user's list of restaurants
        url: '/business/' + data[restArr[getRandInteger(0, restArr.length - 1)]],
        type: 'GET',
        dataType: 'json',
        async: false,
        success: (restaurant) => {
          let catLength = restaurant.categories.length;
          //pick a random category
          randCat = restaurant.categories[getRandInteger(0, catLength - 1)].title;
          console.log(randCat);
        }
      });

      //Ajax request to display a random restaurant from the random category
      $.ajax({
        url: '/search/rec/' + randCat + '/'+city+', CA/0',
        type: 'GET',
        dataType: 'json',
        success: (data) => {
          console.log('ajax sucess!', data);
          //get the first business
          const business = data.businesses[getRandInteger(0, 10)];
          rbusinessID = business.id;
          $('#r_recom-data').html("");
          $('#storeBox').show();
          $('#r_name').html(business.name);
          $('#r_pic').attr('src', business.image_url).attr('width', '300px');
          $('#r_info').html('Tags: ' + getTags(business.categories));
          $('#r_address').html((business.location.display_address).join(', '));
          $('#r_addButton').show();
          $('#hideButton').show();
        }
      });
    })
  }

  function getNewDis() {
    $.ajax({
      url: '/search/rec/food/'+ city+', CA/' + getRandInteger(0, 100),
      type: 'GET',
      dataType: 'json',
      success: (data) => {
        console.log('ajax sucess!', data);
        //get the first business
        const business = data.businesses[getRandInteger(0, 19)];
        dbusinessID = business.id;
        $('#d_recom-data').html("");
        $('#discoverBox').show();
        $('#d_name').html(business.name);
        $('#d_pic').attr('src', business.image_url).attr('width', '300px');
        $('#d_info').html('Tags: ' + getTags(business.categories));
        $('#d_address').html('Address: ' + (business.location.display_address).join(', '));
      }
    });
  }

  function setBusiness(restaurantID) {
    var dateString = Date.now();
    console.log(dateString);

    /*Do not add the same restaurant twice
    database.ref('users/' + userName).once('value', (snapshot) => {
      if (snapshot.hasChild(restaurantID)) {
        return;
      }
    });*/

    database.ref('users/' + userName + '/' + dateString).set(restaurantID);
    var d = new Date(dateString)
    console.log(d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear());
  }


  /********** End of getters and setters functions **********/


  // clicking on show more
  $('#reloadButton').click(() => {
    getNewRec();
  });

  // Search button for name
  $('#searchButton').click(() => {
    console.log('search clicked!');

    //get the autocompleted restaurant name
    const val = document.getElementById('searchBox').value;

    /* Ajax request to get the restaurant using the name in the searchbar */
    $.ajax({
      url: '/search/' + val + '/32.8316115/-117.1626717',
      type: 'GET',
      dataType: 'json',
      async: false,
      success: (data) => {
        //get the first business
        restaurantID = data.businesses[0].id;
        console.log(restaurantID);
      }
    });

    /* Ajax request to get more info about this restaurant */
    let business;
    $.ajax({
      url: '/business/' + restaurantID,
      type: 'GET',
      dataType: 'json',
      async: false,
      success: (data) => {
        business = data;
        console.log(data);
      }
    });

    $('#s_recom-data').html("");
    $('#searchResultBox').show();
    $('#s_name').html(business.name);
    $('#s_pic').attr('src', business.image_url).attr('width', '300px');
    $('#s_info').html('Tags: ' + getTags(business.categories));
    $('#s_address').html((business.location.display_address).join(', '));
    $('#addButton').show();
    $('#hideButton').show();
  });

  /******************************/
  $('#r_hideButton').click(() => {
    getNewRec();
  });


  /******************************/
  $('#s_hideButton').click(() => {
    $('#searchResultBox').hide();
  });

  /******************************/
  $('#discoverButton').click(() => {
    getNewDis();
  });

  /******************************/
  $('#d_hideButton').click(() => {
    getNewDis();
  });

  // adding the restaurants shown above will add it to the database
  $('#r_addButton').click(() => {
    console.log("businessID: " + rbusinessID, );

    /*database.ref('users/Prasanth/count').once('value', (snapshot) => {
    	const data = snapshot.val();
    	console.log("data " + data);
    	count = data;

    } );*/
    setBusiness(rbusinessID);

    $('#alertsuccess').show();

    getNewRec();
  });

  /******************************/
  $('#d_addButton').click(() => {
    console.log('clicked!');
    console.log("businessID: " + dbusinessID, );

    setBusiness(dbusinessID);

    $('#alertsuccess').show();

    getNewDis();
  });

  /******************************/
  $('#s_addButton').click(() => {
    console.log('clicked!');
    console.log("businessID: " + restaurantID, );

    setBusiness(restaurantID);

    $('#alertsuccess').show();

    getNewDis();

  });

  //Getting user location
  window.onload = function() {
    var startPos;
    let currLocation = [];
    var geoSuccess = function(position) {
      startPos = position;
      //document.getElementById('startLat').innerHTML = startPos.coords.latitude;
      //document.getElementById('startLon').innerHTML = startPos.coords.longitude;

      currLocation.push(startPos.coords.latitude);
      currLocation.push(startPos.coords.longitude);
      console.log("Loc: " + currLocation);

      var geocoder;
      geocoder = new google.maps.Geocoder();
      var latlng = new google.maps.LatLng(startPos.coords.latitude, startPos.coords.longitude);

  geocoder.geocode(
      {'latLng': latlng},
      function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
              if (results[0]) {
                  var add= results[0].formatted_address ;
                  var  value=add.split(",");

                  count=value.length;

                  city=value[count-3];
                  console.log(city);
              }
              else  {
                  console.log("address not found");
              }
          }
          else {
              console.log("Geocoder failed due to: " + status);
          }
      }
  );
    };
    navigator.geolocation.getCurrentPosition(geoSuccess);
  };




  /******************************
   * CODE FOR AUTO COMPLETE
   *
   *
   */
  function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    let currentFocus;

    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {

      let a, b, i, val = this.value;

      /* ajax request to get the list of resturants*/
      $.ajax({
        url: '/search/' + val + '/32.8316115/-117.1626717',
        type: 'GET',
        dataType: 'json',
        async: false,
        success: (data) => {
          //console.log('ajax success!', data);
          //get the first business
          arr = data.businesses;
          //get only the names of the businesses
          //resultID = arr.map(r => r.id);
          //console.log("IDsss : " + idArr)
          //arr = arr.map(r => r.name);
        }
      });

      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) {
        return false;
      }
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/

        //if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {

        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = arr[i].name.substr(0, val.length);
        b.innerHTML += arr[i].name.substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i].name + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function(e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          document.getElementById("searchButton").style.background = "green";
          //console.log("RESULT ID: " + resultID);
          /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);

      }
    });

    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {

      let x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
    }); //end of autocomplete function

    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (let i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }

    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      let x = document.getElementsByClassName("autocomplete-items");
      for (let i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function(e) {
      closeAllLists(e.target);
    });
  }

  autocomplete(document.getElementById("searchBox"), []);

});
