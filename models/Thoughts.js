const { Schema, model, Types } = require('mongoose');
const reactionSchema = require('./Reaction.js');
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema(
    {
        // set custom id to avoid confusion with parent comment _id
        thoughtText: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 128
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);




thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thoughts = model('Thoughts', thoughtSchema);

module.exports = Thoughts;
