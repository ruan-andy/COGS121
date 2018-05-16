/** Made for testing purposes **/

'use strict';
 
const yelp = require('yelp-fusion');
 
const client = yelp.client("qfJrBat2sVtDJNrOfaG-Cdngzltp2eUpsBmqyj2-5wv1AHpptgzTUVF2guimWa6bgHu7yr6txtp2cKIYg7a0PVUiBcZApER0Hcjf9a7hBIGqSIYqOSnEtPNxi9DrWXYx");
 
client.autocomplete({
  text:'p',
  latitude: '32.8316115',
  longitude: '-117.1626717'
}).then(response => {
  console.log(response.jsonBody.businesses);
}).catch(e => {
  console.log(e);
});

/*get business details
client.business('gary-danko-san-francisco').then(response => {
  console.log(response.jsonBody.name);
}).catch(e => {
  console.log(e);
});

//search for a business
client.search({
  term:'Four Barrel Coffee',
  location: 'san francisco, ca'
}).then(response => {
  console.log(response.jsonBody.businesses[0].categories);
}).catch(e => {
  console.log(e);
});*/
