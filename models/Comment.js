const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReplySchema = new Schema (
    {
        // sets custom id field to avoid confusion with parent comment's _id field
        replyId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        replyBody: {
            type: String,
            required: 'A reply must have some text to it.',
            trim: true
        },
        writtenBy: {
            type: String,
            required: true,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true,
        }
    }
);

const CommentSchema = new Schema (
    {
        writtenBy: {
            type: String,
            required: true,
            trim: true
        },
        commentBody: {
            type: String,
            required: 'A comment must have some text to it.',
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        // use ReplySchema to validate data for a reply
        replies: [ReplySchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
);

CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;