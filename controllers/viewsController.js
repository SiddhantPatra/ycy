const Question = require('../models/questionModel');
const Note = require('../models/notesModel');
const Answer = require('../models/answerModel');
const User = require('../models/userModel');
const Blog = require('../models/blogModel');
const Enquiry = require('../models/enquiryModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getHome = catchAsync(async (req, res, next) => {
  res.status(200).render('index', {
    title: 'Home',
  });
});
exports.getAboutUs = catchAsync(async (req, res, next) => {
  res.status(200).render('about_us', {
    title: 'About Us',
  });
});
exports.getContactUs = catchAsync(async (req, res, next) => {
  res.status(200).render('contact_us', {
    title: 'Contact Us',
  });
});
exports.getMentorship = catchAsync(async (req, res, next) => {
  res.status(200).render('mentorship', {
    title: 'Mentorship',
  });
});
exports.getOneToOne = catchAsync(async (req, res, next) => {
  res.status(200).render('one_to_one_classes', {
    title: 'One To One Classes',
  });
});
exports.getBookReview = catchAsync(async (req, res, next) => {
  res.status(200).render('book_review', {
    title: 'Book Review',
  });
});
exports.getBookReviewView = catchAsync(async (req, res, next) => {
  res.status(200).render('book_review_view', {
    title: 'Book Review View',
  });
});
exports.getBookReviewDetails = catchAsync(async (req, res, next) => {
  res.status(200).render('book_review_details', {
    title: 'Book Review Details',
  });
});
exports.getBookAskQuestion = catchAsync(async (req, res, next) => {
  res.status(200).render('book_ask_question', {
    title: 'Book Ask Question',
  });
});
exports.getCollegeReview = catchAsync(async (req, res, next) => {
  res.status(200).render('college_review', {
    title: 'College Review',
  });
});
exports.getCollegeReviewView = catchAsync(async (req, res, next) => {
  res.status(200).render('college_review_view', {
    title: 'College Review',
  });
});
exports.getCollegeReviewDetails = catchAsync(async (req, res, next) => {
  res.status(200).render('college_review_details', {
    title: 'College Review',
  });
});
exports.getCollegeAskQuestion = catchAsync(async (req, res, next) => {
  res.status(200).render('college_ask_question', {
    title: 'College Ask Question',
  });
});
exports.viewEnquiry = catchAsync(async (req, res) => {
  const enquiries = await Enquiry.find().sort({ creationOn: -1 });
  res.status(200).render('view_enquiry', {
    title: 'View Enquiry',
    enquiries,
  });
});

exports.getOverview = catchAsync(async (req, res, next) => {
  const questions = await Question.find();
  res.status(200).render('question_overview', {
    title: 'All questions',
    questions,
  });
});
exports.getMyQuestions = catchAsync(async (req, res, next) => {
  const questions = await Question.find({ userId: req.user.id });
  res.status(200).render('my_questions', {
    title: 'My questions',
    questions,
  });
});
exports.getUnansweredQuestions = catchAsync(async (req, res, next) => {
  const answers = await Answer.find();
  const questionIds = answers.map((el) => el.question);
  const unansweredQuestions = await Question.find({
    _id: { $nin: questionIds },
  });
  res.status(200).render('unanswered_questions', {
    title: 'My questions',
    unansweredQuestions,
  });
});
exports.getMyAnswers = catchAsync(async (req, res, next) => {
  const answers = await Answer.find({ user: req.user.id });
  // 2) find questions with the returned ids
  const questionIds = answers.map((el) => el.question);
  const questions = await Question.find({ _id: { $in: questionIds } });
  res.status(200).render('my_answers', {
    title: 'My Questions',
    questions,
  });
});
exports.getMyNotes = catchAsync(async (req, res, next) => {
  const notes = await Note.find({ userId: req.user.id });
  res.status(200).render('my_notes', {
    title: 'My Questions',
    notes,
  });
});
exports.getMyBlogs = catchAsync(async (req, res, next) => {
  const blogs = await Blog.find({ author: req.user.id });
  res.status(200).render('my_blogs', {
    title: 'My Blogs',
    blogs,
  });
});
exports.getQuestion = catchAsync(async (req, res, next) => {
  const question = await Question.findOne({ slug: req.params.slug }).populate({
    path: 'answers',
    fields: 'createdOn answer  likes user ',
    options: { sort: { createdOn: -1 } },
  });
  console.log(question);
  if (!question) {
    return next(new AppError('There is no question with that name', 404));
  }
  res.status(200).render('answer_view', {
    title: `${question.name} question`,
    question,
  });
});
exports.getBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findOne({ _id: req.params._id });
  if (!blog) {
    return next(new AppError('There is no blog with that id', 404));
  }
  const recentBlogs = await Blog.find().sort({ createdOn: -1 }).limit(5);
  res.status(200).render('view_blog', {
    title: `${blog.name} blog`,
    blog,
    recentBlogs,
  });
});
exports.searchQuestion = catchAsync(async (req, res, next) => {
  const question = await Question.findOne({ slug: req.params.slug }).populate({
    path: 'answers',
    fields: 'answer likes user creationOn',
  });

  if (!question) {
    return next(new AppError('There is no question with that name', 404));
  }
  res.status(200).render('answer_view', {
    title: `${question.name} question`,
    question,
  });
});

exports.getSignupForm = (req, res, next) => {
  res.status(200).render('signup', {
    title: 'Sign up to get started',
  });
};

exports.getLoginForm = (req, res, next) => {
  res.status(200).render('login', {
    title: 'Log Into Your Account',
  });
};
exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your Account',
  });
};
exports.getStudents = catchAsync(async (req, res, next) => {
  const users = await User.find({ role: 'user' });

  res.status(200).render('view_students', {
    title: 'Students',
    users,
  });
});
exports.getTeachers = catchAsync(async (req, res, next) => {
  const users = await User.find({ role: 'teacher' });

  res.status(200).render('view_teachers', {
    title: 'Your Teachers',
    users,
  });
});
exports.getTeachersApplications = catchAsync(async (req, res, next) => {
  const users = await User.find({ appliedStatus: 'pending' });
  res.status(200).render('view_teachers_applications', {
    title: 'Your Teachers',
    users,
  });
});
exports.createBlogForm = (req, res) => {
  res.status(200).render('create_blog', {
    title: 'Create Blog',
  });
};

exports.createNotesForm = (req, res) => {
  res.status(200).render('upload_notes', {
    title: 'Create Notes',
  });
};
exports.getNotes = catchAsync(async (req, res, next) => {
  const notes = await Note.find();
  // console.log(notes);
  res.status(200).render('view_notes', {
    title: 'View Notes',
    notes,
  });
});
exports.viewBlogs = catchAsync(async (req, res, next) => {
  const blogs = await Blog.find().sort({ createdOn: -1 });
  const user = res.locals.user;
  res.status(200).render('view_blogs', {
    title: 'View Blogs',
    blogs,
    user,
  });
});
exports.viewBlogstutor = catchAsync(async (req, res, next) => {
  const blogs = await Blog.find({ category: 'Tutors' }).sort({
    createdOn: -1,
  });
  res.status(200).render('view_blogs', {
    title: 'View Blogs Tutors',
    blogs,
  });
});
exports.viewBlogsstudent = catchAsync(async (req, res, next) => {
  const blogs = await Blog.find({ category: 'Students' }).sort({
    createdOn: -1,
  });
  res.status(200).render('view_blogs', {
    title: 'View Blogs Students',
    blogs,
  });
});
exports.viewBlogseducation = catchAsync(async (req, res, next) => {
  const blogs = await Blog.find({ category: 'Education' }).sort({
    createdOn: -1,
  });
  res.status(200).render('view_blogs', {
    title: 'View Blogs Education',
    blogs,
  });
});
exports.viewBlogssuccess = catchAsync(async (req, res, next) => {
  const blogs = await Blog.find({ category: 'Success Story' }).sort({
    createdOn: -1,
  });
  res.status(200).render('view_blogs', {
    title: 'View Blogs Success Story',
    blogs,
  });
});
exports.getQuestionForm = (req, res) => {
  res.status(200).render('question_create', {
    title: 'Ask Question',
  });
};

exports.updateUserData = async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).render('account', {
    title: 'Your Account',
    user: updatedUser,
  });
};
