const { Pizza, Comment } = require('../models');

const commentController = {
    // add comment to a pizza
    createComment({ params, body }, res) {
        Comment.create(body)
            // destructure the id value of the new comment...
            // and push it to the comments array in the paired pizza document
            .then(({ _id }) => {
                return Pizza.findOneAndUpdate(
                    { _id: params.pizzaId },
                    { $push: { comments: _id } },
                    { new: true }
                );
            })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                };

                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    },
    deleteComment({ params }, res) {
        // find the comment needing to be deleted
        Comment.findOneAndDelete({ _id: params.commentId })
            .then(deletedComment => {
                if (!deletedComment) {
                    res.status(404).json({ message: 'No comment with this id was found!' });
                    return;
                };

                // update the comment array for the associated pizza
                return Pizza.findOneAndUpdate(
                    { _id: params.pizzaId },
                    { $pull: { comments: params.commentId } },
                    { new: true }
                );
            })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id' });
                    return;
                };

                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err))
    }
};

module.exports = commentController;