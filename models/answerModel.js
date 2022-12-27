const mongoose = require('mongoose');  

const answerSchema = new mongoose.Schema(
  {
    answer: {
      type: String,
      trim: true,
      required: [true, 'An answer can not be empty'],
    },
    likes: {
      type: Number,
      default: 0,
    },
    createdOn: {
      type: Date,
      default: Date.now(),
      select: false,
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Answer must belong to a User'],
    },
    question: {
      type: mongoose.Schema.ObjectId,
      ref: 'Question',
      required: [true, 'Answer must belong to a question'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
answerSchema.index({ question: 1, user: 1 }, { unique: true });

answerSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo _id role ',
  });
  next();
});
 
const Answer = mongoose.model('Answer', answerSchema);
module.exports = Answer;
