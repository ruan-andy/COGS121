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
  'example': {name: 'example', pic: 'example.jpg', info: ['low cost', 'local', 'american', 'popular'], id: 1},
  'example1': {name: 'example1', pic: 'example.jpg', info: ['high close', 'unique', 'american'], id: 2}
};

app.get('/example', (req,res) => {
  res.send(exampleDatabase);
});

//http://localhost:3000/
app.listen(3000, () => {
  console.log('Server started at http://localhost:3000/');
});
