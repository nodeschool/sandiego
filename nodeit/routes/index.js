var express = require('express');
var router = express.Router();
var util = require('util');

var data = require('../data.json');

router.get('/', function (request, response) {
    response.render('index', {
        title: 'Nodeit',
        posts: data.posts
    });
});

router.get('/submit', function (request, response) {
    response.render('submit', {
        title: 'Submit Post'
    });
});

router.post('/submit', function (request, response) {
    // Get the title. If it's undefined set it to an empty string.
    var title = request.body.title || '';

    // Get the URL. If it's undefined set it to an empty string.
    var url = request.body.url || '';

    // Get the name of the user. If it's undefined set it to an empty string.
    var name = request.body.name || '';

    // Check that all fields are filled out.
    if (title === '' || url === '' || name === '') {
        return response.render('submit', {
            title: 'Submit Post',
            status: 'You must fill out all fields.'
        });
    }

    // Create a new post with the given title, URL, and name.
    data.posts.push({
        'title': title,
        'link': url,
        'user': name,
        'likes': 0 // Default to 0 likes.
    });

    return response.render('submit', {
        title: 'Submit Post',
        status: 'Your post has been submitted!'
    });
});

router.post('/api/like', function (request, response) {
    var index = request.body.index;

    data.posts[index].likes++;

    response.sendStatus(200);
});

module.exports = router;
