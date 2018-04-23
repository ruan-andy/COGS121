$(document).ready(() => {
	$.ajax({
		url: 'example',
		type: 'GET',
		dataType: 'json',
		success: (data) => {
			console.log('received data', data);
			$('#name').html('restaurant name: ' + data.example.name);
			$('#pic').attr('src', data.example.pic);
			$('#info').html('restaurant info: ' + data.example.info);
		},
	});
});
