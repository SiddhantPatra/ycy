const Answer = require('./../models/answerModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('../controllers/handlerFactory');

exports.setQuestionUserIds = (req, res, next) => {
  if (!req.body.question) req.body.question = req.params.questionId;
  if (!req.body.user) req.body.user = req.user._id;
  next();
};
exports.getAllAnswers = factory.getAll(Answer);
exports.getAnswer = factory.getOne(Answer);
exports.createAnswer = factory.createOne(Answer);
exports.updateAnswer = factory.updateOne(Answer);
exports.deleteAnswer = factory.deleteOne(Answer);
