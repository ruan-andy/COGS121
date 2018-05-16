$(document).ready(() => {
  //loads data from get example url to display restaurants 
/*
	$.ajax({
		url: 'example',
		type: 'GET',
		dataType: 'json',
		success: (data) => {
			console.log('received data', data);
      for(const [rest, val] of Object.entries(data)) {
        $('#restaurants').append(
          '<div id='+ val.id + '<div id="name">restaurant name: ' + val.name + '</div>' +
          '<img id="pic" src="' + val.pic + '"></img>' +
          '<div id="info">' + val.info + '</div>' +
          '<div id="select"></div> <br>');
      };
		},
	});*/
	$.ajax({
		url: 'history',
		type: 'GET',
		dataType: 'json',
		//async: false,
		success: (data) => {
        for(i in data) {
			/* Ajax request to get the name of the given ID */
			$.ajax({
  				url: '/business/' + data[i],
  				type: 'GET',
  				dataType: 'json',
  				async: false,
  				success: (restaurant) => {
  					$('#history_list').append('<li>' + restaurant.name + '<br>' +
  						'<img src=\"' + restaurant.image_url + '\"' + 'width=300px' + '/>' + '</li>');
				}
			})	
        }
      },
	})

});
