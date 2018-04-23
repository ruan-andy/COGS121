//use express
const express = require('express');
const app = express();

//access files from static_files folder w/o path
app.use(express.static('views'));
app.use(express.static('images'));
//necessary to use files from public
app.use(express.static('public'));

//send data to a url
app.get('exampleUrl', (req,res) => {
//  res.send(databaseValues);
});

const exampleDatabase = {
  'example1': {name: 'example1', pic: 'example.jpg', address: '123 Example St, City CA Zip', info: ['low cost', 'local', 'american', 'popular'], id: 1},
  'example2': {name: 'example2', pic: 'example.jpg', address: '123 Example St, City CA Zip', info: ['high close', 'unique', 'american'], id: 2}
};

app.get('/example', (req,res) => {
  res.send(exampleDatabase);
});

app.get('/example/:storeid', (req, res) => {
  const storeToLookup = req.params.storeid;
  const val = exampleDatabase[storeToLookup];
  if(val) res.send(val);
  else res.send({});
});

//http://localhost:3000/
app.listen(3000, () => {
  console.log('Server started at http://localhost:3000/');
});
