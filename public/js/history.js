$(document).ready(() => {

  //loads data from get example url to display restaurants 
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
	});
});
