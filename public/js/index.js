$(document).ready(() => {
	$('#reloadButton').click(() => {
		console.log('clicked!');
		$.ajax({
			url: 'example/example1',
			type: 'GET',
			dataType: 'json',
			success: (data) => {
				console.log('ajax sucess!', data);
				$('#recom-data').html("");
				$('#name').html('restaurant name: ' + data.name);
				$('#pic').attr('src', data.pic);
				$('#info').html('Tags: ' + data.info);
				$('#address').html('Address: ' + data.address);
			}
		});
	});
});
