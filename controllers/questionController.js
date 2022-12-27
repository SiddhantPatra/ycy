const Question = require('../models/questionModel');

const catchAsync = require('../utils/catchAsync');

const factory = require('../controllers/handlerFactory');

exports.getAllQuestions = factory.getAll(Question);
exports.getQuestion = factory.getOne(Question, {
  path: 'answers users',
});
exports.createQuestion = factory.createOne(Question);
exports.updateQuestion = factory.updateOne(Question);
exports.deleteQuestion = factory.deleteOne(Question);

exports.getQuestionSubject = catchAsync(async (req, res, next) => {
  const questions = await Question.find({
    subject: { $regex: req.params.subject, $options: 'i' },
  }).sort({
    createdOn: -1,
  });
  res.status(200).render('question_overview', {
    title: 'View Question Subject',
    questions,
  });
});
exports.getQuestionQuestion = catchAsync(async (req, res, next) => {
  const questions = await Question.find({
    question: { $regex: req.params.question, $options: 'i' },
  }).sort({
    createdOn: -1,
  });
  res.status(200).render('question_overview', {
    title: 'View Question  ',
    questions,
  });
});
exports.getQuestionboth = catchAsync(async (req, res, next) => {
  const questions = await Question.find({
    subject: { $regex: req.params.subject, $options: 'i' },
    question: { $regex: req.params.question, $options: 'i' },
  }).sort({
    createdOn: -1,
  });

  res.status(200).render('question_overview', {
    title: 'View Question ',
    questions,
  });
});
