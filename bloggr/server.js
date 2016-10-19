const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const PouchDB = require('pouchdb');
const methodOverride = require('method-override');

// Set the port to listen to requests on
const PORT = process.env.PORT || 3000;

// Create the app
const app = express();

// Create the database
const db = new PouchDB('blog');

// =========================
// App Configs
// =========================
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

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
app.get('/', (req, res) => {

  // Find all the documents
  db.allDocs({
    include_docs: true,
    attachments: true
  }, (err, result) => {
    // If there was an error, log it
    if(err) {
      console.log(err);
    }
    // Else render the 'posts' view and pass it all the posts
    else {
      res.render('posts', { posts: result.rows });
    }
  });

});

//========================
// GET form for new post
//========================
app.get('/new', (req, res) => {

  // Render the 'new-post' view
  res.render('new-post');

});

//========================
// POST creates a new post
//========================
app.post('/', (req, res) => {
  // Create a post object with the information received
  // from the body of the request
  const post = {
    title: req.body.title,
    post: req.body.post
  };

  // Save the post to the database
  db.post(post, (err, created) => {
    // If there was an error, log it
    if(err) {
      console.log(err);
    }
    // Redirect to the '/' route
    res.redirect('/');
  });

});

//==========================
// GET a single post
//==========================
app.get('/:id', (req, res) => {

  // Get the post form the database
  db.get(req.params.id, (err, found) => {
    // If there was an error, log it
    if(err) {
      console.log(err);
      // Redirect to the '/' route
      res.redirect('/');
    }
    // Else the post was found
    else {
      res.render('show-post', { post: found });
    }
  });

});

//==========================
// GET form to edit a post
//==========================
app.get('/:id/edit', (req, res) => {

  // Get the post from the database
  db.get(req.params.id, (err, found) => {
    // If there was an error, log it
    if(err) {
      console.log(err);
      // Redirect to the '/' route
      res.redirect('/');
    }
    // Else the post was found
    else {
      res.render('edit-post', { post: found });
    }
  });

});

//===============================================
// PUT a post back in the database after updating
//===============================================
app.put('/:id', (req, res) => {

  // Get the post from the database
  db.get(req.params.id, (err, found) => {
    // If there was an error, log it
    if(err) {
      console.log(err);
      // Redirect to the '/' route
      res.redirect('/');
    }
    // Else the post was found
    else {
      // Now save the updated post
      db.put({
        _id: found._id,
        _rev: found._rev,
        title: req.body.title,
        post: req.body.post
      }, (err, saved) => {
        // If there was an error, log it
        if(err) {
          console.log(err);
        }
        // Redirect to the '/' route
        res.redirect('/');
      });
    }
  });

});

//====================================
// DELETE a post from the database
//====================================
app.delete('/:id', (req, res) => {

  // Get the post from the database
  db.get(req.params.id, (err, found) => {
    // If there was an error, log it
    if(err) {
      console.log(err);
      // Redirect to the '/' route
      res.redirect('/');
    }
    // Else the post was found
    else {
      // Remove the post from the database
      db.remove(found, (err, removed) => {
        // If there was an error, log it
        if(err) {
          console.log(err);
        }
        // Redirect to the '/' route
        res.redirect('/');
      });
    }
  });

});


// This is a route simply to test if the server is working
app.get('/ping', (req, res) => {
  res.send('Hello NodeSchool!');
});

app.listen(PORT, () => console.log('Server listening on port: ' + PORT));
