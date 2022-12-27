const express = require('express');
const answerController = require('../controllers/answerController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(answerController.getAllAnswers)
  .post(
    authController.restrictTo('teacher', 'admin', 'user'),
    answerController.setQuestionUserIds,
    answerController.createAnswer
  );
router
  .route('/:id')
  .get(answerController.getAnswer)
  .patch(
    authController.restrictTo('teacher', 'admin', 'user'),
    answerController.updateAnswer
  )
  .delete(
    authController.restrictTo('teacher', 'admin', 'user'),
    answerController.deleteAnswer
  );
module.exports = router;
