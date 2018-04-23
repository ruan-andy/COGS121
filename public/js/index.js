$(document).ready(() => {

let prevNum = 0;

function getRandInteger(min, max) {
		let num = 0;
		do {
			num = Math.floor(Math.random() * (max - min + 1) ) + min;
		}	while(prevNum == num)
		prevNum = num;
		return num + '';
}

	$('#reloadButton').click(() => {
		console.log('clicked!');
		$.ajax({
			url: 'example/example' + getRandInteger(1,3),
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
