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

  let prevNum = 0;
  let businessID;
  //let resultID;

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

  let rbusinessID;

  // clicking on show more
  $('#reloadButton').click(() => {
    console.log('clicked!');
    $.ajax({
      url: '/search/BBQ/San Diego, CA',
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
  });

  let restaurantID;

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

  $('#r_hideButton').click(() => {
    console.log('clicked!');
    $.ajax({
      url: '/search/BBQ/San Diego, CA',
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
  });

  $('#s_hideButton').click(() => {
    $('#searchResultBox').hide();
  });

  let dbusinessID;

  // clicking on discover
  $('#discoverButton').click(() => {
    console.log('clicked!');
    $.ajax({
      url: '/search/food/San Diego, CA',
      type: 'GET',
      dataType: 'json',
      success: (data) => {
        console.log('ajax sucess!', data);
        //get the first business
        const business = data.businesses[getRandInteger(0, 19)];
        dbusinessID = business.id;
        $('#d_recom-data').html("");
        $('#discoverBox').show();
        $('#d_name').html('Restaurant Name: ' + business.name);
        $('#d_pic').attr('src', business.image_url).attr('width', '300px');
        $('#d_info').html('Tags: ' + getTags(business.categories));
        $('#d_address').html('Address: ' + (business.location.display_address).join(', '));
      }
    });
  });

  $('#d_hideButton').click(() => {
    console.log('clicked!');
    $.ajax({
      url: '/search/food/San Diego, CA',
      type: 'GET',
      dataType: 'json',
      success: (data) => {
        console.log('ajax sucess!', data);
        //get the first business
        const business = data.businesses[getRandInteger(0, 19)];
        dbusinessID = business.id;
        $('#d_recom-data').html("");
        $('#discoverBox').show();
        $('#d_name').html('Restaurant Name: ' + business.name);
        $('#d_pic').attr('src', business.image_url).attr('width', '300px');
        $('#d_info').html('Tags: ' + getTags(business.categories));
        $('#d_address').html('Address: ' + (business.location.display_address).join(', '));
      }
    });
  });

  // adding the restaurants shown above will add it to the database
  $('#r_addButton').click(() => {
    console.log('clicked!');
    console.log("businessID: " + rbusinessID, );

		/*database.ref('users/Prasanth/count').once('value', (snapshot) => {
			const data = snapshot.val();
			console.log("data " + data);
			count = data;

		} );*/
		var dateString = Date.now();
		console.log(dateString);
		database.ref('users/' + userName + '/' + dateString ).set(rbusinessID);

		//This is how to get date from dateString
		var d = new Date(dateString)
		console.log(d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear());

    /*$.ajax({
      // all URLs are relative to http://localhost:3000/
      url: '/history',
      type: 'POST', // <-- this is POST, not GET
      data: {
        //stores the business ID into the database
        name: rbusinessID,
      },
      success: (data) => {
        $('#status').html(data.message);
      }
    });*/
  });

  $('#d_addButton').click(() => {
    console.log('clicked!');
    console.log("businessID: " + dbusinessID, );

		var dateString = Date.now();
		console.log(dateString);
		database.ref('users/' + userName + '/' + dateString ).set(dbusinessID);

    /*$.ajax({
      // all URLs are relative to http://localhost:3000/
      url: '/history',
      type: 'POST', // <-- this is POST, not GET
      data: {
        //stores the business ID into the database
        name: dbusinessID,
      },
      success: (data) => {
        $('#status').html(data.message);
      }
    });*/
  });

  $('#s_addButton').click(() => {
    console.log('clicked!');
    console.log("businessID: " + restaurantID, );

		var dateString = Date.now();
		console.log(dateString);
		database.ref('users/' + userName + '/' + dateString ).set(restaurantID);

    /*$.ajax({
      // all URLs are relative to http://localhost:3000/
      url: '/history',
      type: 'POST', // <-- this is POST, not GET
      data: {
        //stores the business ID into the database
        name: restaurantID,
      },
      success: (data) => {
        $('#status').html(data.message);
      }
    });*/
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
    };
    navigator.geolocation.getCurrentPosition(geoSuccess);
  };



  /** CODE FOR AUTO COMPLETE
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
