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

/* Concatenate the array of tags */
function getTags(categories) {
	let str = '';
	//append each categories to the string
	for (const c of categories) {
		str = str + c.title + '; ';
	}
	return str;
}

$('#reloadButton').click(() => {
	console.log('clicked!');
	$.ajax({
		url: '/BBQ/San Diego, CA',
		type: 'GET',
		dataType: 'json',
		success: (data) => {
			console.log('ajax sucess!', data);
			//get the first business
			const business = data.businesses[getRandInteger(0, 10)];
			$('#recom-data').html("");
			$('#name').html('restaurant name: ' + business.name);
			$('#pic').attr('src', business.image_url).attr('width', '300px');
			$('#info').html('Tags: ' + getTags(business.categories));
			$('#address').html('Address: ' + (business.location.display_address).join(', '));
		}
	});
});
});
