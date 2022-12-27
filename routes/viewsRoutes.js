const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const notesController = require('../controllers/notesController');
const questionController = require('../controllers/questionController');

const router = express.Router();

router.get('/', authController.isLoggedIn, viewsController.getHome);
router.get('/about-us', authController.isLoggedIn, viewsController.getAboutUs);
router.get(
  '/contact-us',
  authController.isLoggedIn,
  viewsController.getContactUs
);
router.get(
  '/mentorship',
  authController.isLoggedIn,
  viewsController.getMentorship
);
router.get(
  '/one-to-one-classes',
  authController.isLoggedIn,
  viewsController.getOneToOne
);
router.get(
  '/book-review',
  authController.isLoggedIn,
  viewsController.getBookReview
);
router.get(
  '/book-review-view',
  authController.isLoggedIn,
  viewsController.getBookReviewView
);
router.get(
  '/book-review-details',
  authController.isLoggedIn,
  viewsController.getBookReviewDetails
);
router.get(
  '/book-ask-question',
  authController.isLoggedIn,
  viewsController.getBookAskQuestion
);
router.get(
  '/college-review',
  authController.isLoggedIn,
  viewsController.getCollegeReview
);
router.get(
  '/college-review-view',
  authController.isLoggedIn,
  viewsController.getCollegeReviewView
);
router.get(
  '/college-review-details',
  authController.isLoggedIn,
  viewsController.getCollegeReviewDetails
);
router.get(
  '/college-ask-question',
  authController.isLoggedIn,
  viewsController.getCollegeAskQuestion
);

router.get('/login', viewsController.getLoginForm);
router.get('/me', authController.protect, viewsController.getAccount);
router.get('/signup', viewsController.getSignupForm);
// ASK QUESTION
router.get(
  '/ask-question',
  authController.isLoggedIn,
  viewsController.getQuestionForm
);
router.get(
  '/create-blog',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.createBlogForm
);

router.get('/view-blogs', authController.isLoggedIn, viewsController.viewBlogs);
router.get(
  '/view-blogs-tutor',
  authController.isLoggedIn,
  viewsController.viewBlogstutor
);
router.get(
  '/view-blogs-student',
  authController.isLoggedIn,
  viewsController.viewBlogsstudent
);
router.get(
  '/view-blogs-education',
  authController.isLoggedIn,
  viewsController.viewBlogseducation
);
router.get(
  '/view-blogs-success-stories',
  authController.isLoggedIn,
  viewsController.viewBlogssuccess
);

router.get(
  '/view-enquiry',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.viewEnquiry
);
router.get(
  '/upload-notes',
  authController.protect,
  viewsController.createNotesForm
);
router.get('/view-notes', authController.protect, viewsController.getNotes);
router.get(
  '/view-students',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.getStudents
);
router.get(
  '/view-teachers',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.getTeachers
);
router.get(
  '/view-teacher-applications',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.getTeachersApplications
);
router.get(
  '/all-questions',
  authController.isLoggedIn,
  viewsController.getOverview
);
router.get(
  '/my-questions',
  authController.protect,
  viewsController.getMyQuestions
);
router.get(
  '/unanswered-questions',
  authController.protect,
  viewsController.getUnansweredQuestions
);
router.get('/my-answers', authController.protect, viewsController.getMyAnswers);
router.get('/my-notes', authController.protect, viewsController.getMyNotes);
router.get('/my-blogs', authController.protect, viewsController.getMyBlogs);

router.get('/:slug', authController.protect, viewsController.getQuestion);

// FILTER NOTES
router.get(
  '/view-notes-subject/:subject',
  authController.protect,
  notesController.getNoteSubject
);
router.get(
  '/view-notes-className/:className',
  authController.protect,
  notesController.getNoteClassName
);
router.get(
  '/view-notes/:subject/:className',
  authController.protect,
  notesController.getNoteboth
);

// SEARCH QUESTION
router.get(
  '/search-question-subject/:subject',
  authController.isLoggedIn,
  questionController.getQuestionSubject
);
router.get(
  '/search-question-question/:question',
  authController.isLoggedIn,
  questionController.getQuestionQuestion
);
router.get(
  '/search-question/:subject/:question',
  authController.isLoggedIn,
  questionController.getQuestionboth
);

router.get('/:_id/blog', authController.isLoggedIn, viewsController.getBlog);

// UPDATE USER
router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);

module.exports = router;
