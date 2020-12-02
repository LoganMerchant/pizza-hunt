const router = require('express').Router();
const { 
    createComment, 
    createReply, 
    deleteComment, 
    deleteReply 
} = require('../../controllers/comment-controller');

router
    .route('/:pizzaId')
    .post(createComment);

router
    .route('/:pizzaId/:commentId')
    .put(createReply)
    .delete(deleteComment);

router
    .route('/:pizzaId/:commentId/:replyId')
    .delete(deleteReply);

module.exports = router;