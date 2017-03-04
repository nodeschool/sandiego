// Import module dependencies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var PouchDB = require('pouchdb');

// Set the PORT to listen to requests on
var PORT = process.env.PORT || 4000;

// Create the app
var app = express();

// Create the Database
var db = new PouchDB('blog');

// =========================
// App Configs
// =========================
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.disable('x-powered-by');
// Allowing CORS
app.use(function(req,res,next) {
	res.append('Access-Control-Allow-Origin', req.headers.origin || '*');
	res.append('Access-Control-Allow-Credentials', 'true');
	res.append('Access-Control-Allow-Methods', ['GET', 'OPTIONS', 'PUT', 'POST', 'DELETE']);
	res.append('Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept');
	next();
});
app.enable('trust proxy');

// =======================================================================
// RESTful Routes
// HTTP Verbs: GET, POST, PUT, DELETE
//
// Name     |   Path      |   HTTP Verb |   Purpose
// =======================================================================
// Index    |   /         |   GET       | List all the posts
// New      |   /new      |   GET       | Show a form to create new posts
// Create   |   /         |   POST      | Create a new post
// Show     |   /:id      |   GET       | Show a single post
// Edit     |   /:id/edit |   GET       | Show a form to edit a post
// Update   |   /:id      |   PUT       | Update a particular post
// Destroy  |   /:id      |   DELETE    | Delete a particular post
// =======================================================================

//======================
// GET all posts
//======================
app.get('/posts/', function(req, res) {
  // Find all the documents
  db.allDocs({
    include_docs: true,
    attachments: true
  }, function (err, result) {
    // If there was an error, log it
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    // Else send the documents found
    else {
      res.status(200).json(result.rows);
    }
  });
});

//========================
// POST creates a new post
//========================
app.post('/posts/', function(req, res) {
  // Create a post object with the information received
  // from the body of the request
  var post = {
    title: req.body.title,
    post: req.body.post
  };

  // Save the post to the database
  db.post(post, function(err, created) {
    // If there was an error, log it
    if (err || !created) {
      console.log(err);
      res.sendStatus(500);
    } else {
      return res.status(201).json(created);
    }
  });
});

//==========================
// GET a single post
//==========================
app.get('/posts/:id', function(req, res) {
  // Get the post from the database
  db.get(req.params.id, function(err, found) {
    // If there was an error, log it
    if (err || !found) {
      console.log('Something went wrong');
      res.sendStatus(500);
    }
    // Else the post was found
    else {
      res.status(200).json(found);
    }
  });
});

//===============================================
// PUT a post back in the database after updating
//===============================================
app.put('/posts/:id', function(req, res) {

  // Get the post from the database
  db.get(req.params.id, function(err, found) {
    // If there was an error, log it
    if (err || !found) {
      console.log('Something went wrong');
      res.sendStatus(500);
    }
    // Else the post was found
    else {
      // Now save the updated post
      db.put({
        _id: found._id,
        _rev: found._rev,
        title: req.body.title,
        post: req.body.post
      }, function(err, saved) {
        // If there was an error, log it
        if (err || !saved) {
          console.log('Something went wrong');
          res.sendStatus(500);
        } else {
          res.status(201).json(saved);
        }
      });
    }
  });

});

//====================================
// DELETE a post from the database
//====================================
app.delete('/posts/:id', function(req, res) {

  // Get the post from the database
  db.get(req.params.id, function(err, found) {
    // If there was an error, log it
    if (err) {
      console.log(err);
      // Redirect to the '/' route
      res.sendStatus(500);
    }
    // Else the post was found
    else {
      // Remove the post from the database
      db.remove(found, function(err, removed) {
        // If there was an error, log it
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          res.status(202).json(removed);
        }
      });
    }
  });

});

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// Make the app listen to a particular port
app.listen(PORT, function() {
  console.log('Server listening on port: ' + PORT);
});
