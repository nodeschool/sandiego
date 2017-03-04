import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.renderPosts = this.renderPosts.bind(this);
    this.getPosts = this.getPosts.bind(this);
    this.deletePost = this.deletePost.bind(this);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    this.getPosts();
  }

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
}

export default App;
