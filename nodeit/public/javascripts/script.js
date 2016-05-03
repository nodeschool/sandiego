$(document).ready(function () {
    // Add click event listening to all links to like a post.
    $('.like-post').on('click', function (event) {
        // Prevent clicking the link from doing anything.
        event.preventDefault();

        // Get the index of this post.
        var index = $(this).data('index');

        // Get the element that contains the number of likes this post has.
        var $likeCount = $(this).closest('.post').find('.like-count');

        // Get the containing element for the link to like a post.
        var $likeContainer = $(this).parent();

        // Send a POST AJAX request to /api/like
        $.post('/api/like', {
            index: index
        }, function () {
            // Get the number of likes the post currently has.
            var likes = Number($likeCount.text());

            // Increment the number of likes by 1.
            likes++;

            // Update the number of likes the post has.
            $likeCount.text(likes);

            // Now that we've liked the post remove the link to like a post.
            $likeContainer.remove();
        });

        return false;
    })
});