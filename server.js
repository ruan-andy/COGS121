//use express
const express = require('express');
const app = express();

//access files from static_files folder w/o path
app.use(express.static('static_files'));

//send data to a url
app.get('/exampleUrl', (req,res) => {
  res.send(databaseValues);
});

//http://localhost:3000/
app.listen(3000, () => {
  console.log('Server started at http://localhost:3000/');
});
