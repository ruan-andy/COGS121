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
		success: (data) => {
        console.log('You received some data!', data);
        //$('#status').html('All restaurants: ' + data);
        //$('#history_list').appendChild(document.createElement("li").createTextNode(data));
        for(i in data) {
        	$('#history_list').append('<li>' + data[i] + '</li>');	
        }
        
      },
	})

});
