$(document).ready(() => {

$('#addButton').hide();
$('#hideButton').hide();
$('#storeBox').hide();
$('#discoverBox').hide();

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

// clicking on show more
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
			$('#r_recom-data').html("");
			$('#storeBox').show();
			$('#r_name').html(business.name);
			$('#r_pic').attr('src', business.image_url).attr('width', '300px');
			$('#r_info').html('Tags: ' + getTags(business.categories));
			$('#r_address').html((business.location.display_address).join(', '));
			$('#addButton').show();
			$('#hideButton').show();
		}
	});
});

// Search button for name
$('#searchButton').click(() => {
	console.log('search clicked!');
	console.log(document.getElementById('searchBox'));
	$.ajax({
		url: '/food/San Diego, CA',
		type: 'GET',
		dataType: 'json',
		success: (data) => {
			console.log('ajax sucess!', data);
			//get the first business
			const business = data.businesses[getRandInteger(0, 10)];
			$('#r_recom-data').html("");
			$('#storeBox').show();
			$('#r_name').html(business.name);
			$('#r_pic').attr('src', business.image_url).attr('width', '300px');
			$('#r_info').html('Tags: ' + getTags(business.categories));
			$('#r_address').html((business.location.display_address).join(', '));
			$('#addButton').show();
			$('#hideButton').show();
		}
	});
});

$('#r_hideButton').click(() => {
	console.log('clicked!');
	$.ajax({
		url: '/BBQ/San Diego, CA',
			const business = data.businesses[getRandInteger(0, 30)];
			$('#d_recom-data').html("");
			$('#discoverBox').show();
			$('#d_name').html('Restaurant Name: ' + business.name);
			$('#d_pic').attr('src', business.image_url).attr('width', '300px');
			$('#d_info').html('Tags: ' + getTags(business.categories));
			$('#d_address').html('Address: ' + (business.location.display_address).join(', '));
		}
	});
});

// clicking on discover
$('#discoverButton').click(() => {
	console.log('clicked!');
	$.ajax({
		url: '/food/San Diego, CA',
		type: 'GET',
		dataType: 'json',
		success: (data) => {
			console.log('ajax sucess!', data);
			//get the first business
			console.log(data.businesses.length)
			const business = data.businesses[getRandInteger(0, 19)];
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
		url: '/food/San Diego, CA',
		type: 'GET',
		dataType: 'json',
		success: (data) => {
			console.log('ajax sucess!', data);
			//get the first business
			const business = data.businesses[getRandInteger(0, 19)];
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
$('#addButton').click(() => {
	console.log('clicked!');
	console.log(document.getElementById('r_name').innerHTML);
	const r_name = document.getElementById('r_name').innerHTML;
	$.ajax({
      // all URLs are relative to http://localhost:3000/
      url: '/history',
      type: 'POST', // <-- this is POST, not GET
      data: {
              name: r_name,
            },
      success: (data) => {
        $('#status').html(data.message);
      }
    });
});


});
