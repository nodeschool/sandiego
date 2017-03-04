# RESTful Routes

| Name   | Path      | HTTP Verb | Purpose                         |
|--------|-----------|-----------|---------------------------------|
| Index  | /         | GET       | List all the posts              |
| New    | /new      | GET       | Show a form to create new posts |
| Create | /         | POST      | Create a new post               |
| Show   | /:id      | GET       | Show a single post              |
| Edit   | /:id/edit | GET       | Show a form to edit a post      |
| Update | /:id      | PUT       | Update a particular post        |
| Delete | /:id      | DELETE    | Delete a particular post        |

# Code Snippets

### Importing Package Dependencies

```js
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var PouchDB = require('pouchdb');
```

### App Config

```js
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
```
### DB Call to GET all posts

```js
db.allDocs({
  include_docs: true,
  attachments: true
}, function(err, result) {
  // If there was an error, log it
  if (err) {
    console.log(err);
  }
  // Else render the 'posts' view and pass it all the posts
  else {
    res.status(200).json(result.rows);
  }
});
```

### DB Call to Create a new post

```js
db.post(post, function(err, created) {
  // If there was an error, log it
  if (err || !created) {
    console.log(err);
    res.sendStatus(500);
  } else {
    return res.status(201).json(created);
  }
});
```

### DB Call to GET a single post

```js
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
```

### DB Call to UPDATE a single post

```js
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
```

### DB Call to DELETE a single post

```js
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
```

### React render method

```jsx
render() {
  return (
    <div className="App">
      <div className="App-header">
        <h2>Blog App</h2>
      </div>
      <form className="App-form" onSubmit={this.handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input ref="title" className="form-control" type="text" id="title" />
        </div>
        <div className="form-group">
          <label htmlFor="post">Post: </label>
          <textarea ref="post" className="form-control" id="post" />
        </div>
        <button className="btn btn-success" type="submit">Create</button>
      </form>
      <div className="App-post-container container">
        <div className="row">
          {this.renderPosts()}
        </div>
      </div>
    </div>
  );
}
```

### React renderPosts method

```jsx
renderPosts() {
    return this.state.posts.map(post => {
      return (
        <div className="col-xs-10 col-xs-offset-1">
          <div className="panel panel-primary">
            <div className="panel-heading">{post.doc.title}</div>
            <div className="panel-body">{post.doc.post}</div>
            <button onClick={() => this.deletePost(post.id)} className="btn btn-danger">Delete</button>
          </div>
        </div>
      );
    });
  }
```

### React getPosts method

```jsx
getPosts() {
  var self = this;

  axios.get('http://localhost:4000/posts/')
    .then(function (response) {
      self.setState({
        posts: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}
```

### React deletePost method

```jsx
deletePost(postId) {
  var self = this;

  axios.delete('http://localhost:4000/posts/' + postId)
    .then(function (response) {
      self.getPosts();
    })
    .catch(function (error) {
      console.log(error);
    });
}
```

### React handleFormSubmit method

```jsx
handleFormSubmit(event) {
  event.preventDefault();

  var title = this.refs.title;
  var post = this.refs.post;

  if (title.value.length > 0 && post.value.length > 0) {
    var self = this;
    
    axios.post('http://localhost:4000/posts/', {
      title: title.value,
      post: post.value
    }).then(function (response) {
      title.value = '';
      post.value = '';
      self.getPosts();
    }).catch(function (error) {
      console.log(error);
    });
  }
}
```
