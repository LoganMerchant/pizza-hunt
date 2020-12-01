const router = require('express').Router();
const { createComment, deleteComment } = require('../../controllers/comment-controller');

router
    .route('/:pizzaId')
    .post(createComment);

router
    .route('/:pizzaId/:commentId')
    .delete(deleteComment);

module.exports = router;