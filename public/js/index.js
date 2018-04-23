$(document).ready(() => {
	$.ajax({
		url: 'example',
		type: 'GET',
		dataType: 'json',
		success: (data) => {
			console.log('received data', data);
			$('#name').html('restaurant name: ' + data.example1.name);
			$('#pic').attr('src', data.example1.pic);
			$('#info').html('restaurant info: ' + data.example1.info);
		},
	});
});
