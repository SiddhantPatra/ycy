const express = require('express');

const questionController = require('./../controllers/questionController');

const authController = require('../controllers/authController');
const answerRouter = require('../routes/answerRoutes');
const blogRouter = require('../routes/blogRoutes');

const router = express.Router();
router.use('/:id/answers', answerRouter);
router.use('/:id/blog', blogRouter);
router
  .route('/')
  .get(questionController.getAllQuestions)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'teacher', 'user'),
    questionController.createQuestion
  );

router
  .route('/:id')
  .get(questionController.getQuestion)
  .patch(
    authController.protect,
    authController.restrictTo('teacher', 'admin', 'user'),
    questionController.updateQuestion
  )
  .delete(
    authController.protect,
    authController.restrictTo('teacher', 'admin', 'user'),
    questionController.deleteQuestion
  );

module.exports = router;
