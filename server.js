//use express
const express = require('express');
const app = express();
const yelp = require('yelp-fusion');
const client = yelp.client("qfJrBat2sVtDJNrOfaG-Cdngzltp2eUpsBmqyj2-5wv1AHpptgzTUVF2guimWa6bgHu7yr6txtp2cKIYg7a0PVUiBcZApER0Hcjf9a7hBIGqSIYqOSnEtPNxi9DrWXYx");

//access files from static_files folder w/o path
app.use(express.static('views'));
app.use(express.static('images'));
//necessary to use files from public
app.use(express.static('public'));

// db
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('users.db');


app.get('/:name/:location', (req, res) => {

  	client.search({
  		term: req.params.name,
  		location: req.params.location
	}).then(response => {
  		console.log("Sending the list of businesses");
  		res.send(response.jsonBody);
	}).catch(e => {
  		console.log(e);
      res.send('[]');
	});
});

app.get('/history', (req, res) => {
  // db.all() fetches all results from an SQL query into the 'rows' variable:
  db.all('SELECT name FROM restaurants', (err, rows) => {
    console.log(rows);
    const allUsernames = rows.map(e => e.name);
    console.log(allUsernames);
    res.send(allUsernames);
  });
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true})); // hook up with your app
app.post('/history', (req, res) => {
  console.log(req.body);
  db.run(
    'INSERT INTO restaurants VALUES ($name)',
    // parameters to SQL query:
    {
      $name: req.body.name,
    },
    // callback function to run when the query finishes:
    (err) => {
      if (err) {
        res.send({message: 'error in app.post(/history)'});
      } else {
        res.send({message: 'successfully run app.post(/history)'});
      }
    }
  );
});

//http://localhost:3000/
app.listen(3000, () => {
  console.log('Server started at http://localhost:3000/');
});


//send data to a url
//app.get('exampleUrl', (req,res) => {
//  res.send(databaseValues);
//});

/*
app.get('/example', (req,res) => {
  res.send(exampleDatabase);
});


app.get('/example/:storeid', (req, res) => {
  const storeToLookup = req.params.storeid;
  const val = exampleDatabase[storeToLookup];
  if(val) res.send(val);
  else res.send({});
});*/


