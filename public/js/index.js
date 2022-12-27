/* eslint-disable */

// npm i @babel/polyfill
import '@babel/polyfill';
// import { displayMap } from './mapbox';
import { login, logout, signup } from './login';
import {
  createQuestion,
  searchQuestion,
  deleteQuestion,
} from './createQuestion';
import { createAnswer, editAnswer, deleteAnswer } from './createAnswer';
import {
  updateSettings,
  deleteUser,
  upgradeTutor,
  banTutor,
} from './updateSettings';
import { uploadNote, deleteNote, filterNotes } from './uploadNote';
import { createBlog, deleteBlog } from './createBlog';
import { createEnquiry, deleteEnquiry } from './createEnquiry';
// import { bookTour } from './stripe';
// import { leaveReview, deleteReview, editReview } from './review';
import { showAlert } from './alerts';

// DOM ELEMENTS
// const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const signupForm = document.querySelector('.form--signup');
const logOutBtn = document.querySelector('.nav__el--logout');
// account form
const userDataForm = document.querySelector('.form-user-data');
const userApplyTutorForm = document.querySelector('.form-apply-tutor');
const userPasswordForm = document.querySelector('.form-user-password');
// const upgradeTutorForm = document.querySelector('.form-tutor-upgrade');

const upgradeTutorForm = document.querySelector('.form-tutor-upgrade');

// Notes form
const uploadNotesForm = document.querySelector('.form-upload-note');
const notesFilter = document.querySelector('.notesFilter');
// Blog form
const createBlogForm = document.querySelector('.form-upload-blog');
// Enquiry form
const createEnquiryForm = document.querySelector('.form-enquiry');

// Question form
const askQuestionForm = document.querySelector('.form-ask-question');
const searchQuestionForm = document.querySelector('.form-search-question');
const searchQuestionFormIndex = document.querySelector(
  '.search-question-index'
);

const answerDataForm = document.querySelector('.answer--form');
// const reviewDataForm = document.querySelector('.review--form');
// const bookBtn = document.getElementById('book-tour');

// const reviews = document.querySelector('.reviews');
const answersEdit = document.querySelector('.answer__edit');
const answersUpdate = document.querySelector('.answersUpdate');
const answersDelete = document.querySelector('.answersDelete');
// const notesDelete = document.querySelector('.notesDelete');
// const blogsDelete = document.querySelector('.blogsDelete');
// const enquiryDelete = document.querySelector('.enquiryDelete');
const answers = document.querySelector('.answers');
const notes = document.querySelector('.notes');
const blogdel = document.querySelector('.blogdel');
const enquiries = document.querySelector('.enquiries');
const questiondel = document.querySelector('.questiondel');
// if (mapBox) {
//   const locations = JSON.parse(mapBox.dataset.locations);
//   displayMap(locations);
// }

if (notes)
  notes.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const button = e.target;
      // const noteCard = button.closest('.note__card');
      // const note = noteCard.parentNode;
      if (button.textContent === 'Delete') {
        const noteId = button.dataset.noteId;
        deleteNote(noteId);
      }
    }
  });
if (blogdel)
  blogdel.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const button = e.target;
      // const noteCard = button.closest('.note__card');
      // const note = noteCard.parentNode;
      if (button.textContent === 'Delete') {
        const blogId = button.dataset.blogId;
        deleteBlog(blogId);
      }
    }
  });
if (enquiries)
  enquiries.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const button = e.target;
      // const noteCard = button.closest('.note__card');
      // const note = noteCard.parentNode;
      if (button.textContent === 'Delete') {
        const enquiryId = button.dataset.enquiryId;
        deleteEnquiry(enquiryId);
      }
    }
  });
if (answers)
  answers.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const button = e.target;
      // const noteCard = button.closest('.note__card');
      // const note = noteCard.parentNode;
      if (button.textContent === 'Delete') {
        const answerId = button.dataset.answerId;
        deleteAnswer(answerId);
      }
    }
  });
if (questiondel)
  questiondel.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const button = e.target;
      // const noteCard = button.closest('.note__card');
      // const note = noteCard.parentNode;
      if (button.textContent === 'Delete') {
        const questionId = button.dataset.questionId;
        deleteQuestion(questionId);
      }
    }
  });
if (upgradeTutorForm)
  upgradeTutorForm.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const button = e.target;
      // const noteCard = button.closest('.note__card');
      // const note = noteCard.parentNode;
      if (button.textContent === 'Delete') {
        const tutorId = button.dataset.nuserId;
        deleteUser(tutorId);
      } else if (button.textContent === 'Upgrade') {
        const tutorId = button.dataset.nuserId;
        const role = 'teacher';
        const appliedStatus = '';
        upgradeTutor(role, appliedStatus, tutorId);
      } else if (button.textContent === 'Downgrade') {
        const tutorId = button.dataset.nuserId;
        const role = 'user';
        const appliedStatus = '';
        upgradeTutor(role, appliedStatus, tutorId);
      } else if (button.textContent === 'Cancel Request') {
        const tutorId = button.dataset.nuserId;
        const appliedStatus = '';
        upgradeTutor(role, appliedStatus, tutorId);
      } else if (button.textContent === 'Ban') {
        const tutorId = button.dataset.nuserId;
        const active = 'false';
        const restrictions = 'banned';

        banTutor(active, restrictions, tutorId);
      } else if (button.textContent === 'Remove ban') {
        const tutorId = button.dataset.nuserId;
        const active = 'true';
        const restrictions = '';
        banTutor(active, restrictions, tutorId);
      }
    }
  });
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contact').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    signup(name, email, contact, password, passwordConfirm);
  });
}
if (createEnquiryForm) {
  createEnquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contact').value;
    const message = document.getElementById('message').value;
    createEnquiry(name, email, contact, message);
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm)
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('contact', document.getElementById('contact').value);
    form.append(
      'teachingExperience',
      document.getElementById('teachingExperience').value
    );
    form.append('desiredClass', document.getElementById('desiredClass').value);
    form.append('photo', document.getElementById('photo').files[0]);
    console.log(form);
    updateSettings(form, 'data');
  });
if (userApplyTutorForm)
  userApplyTutorForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append(
      'teachingExperience',
      document.getElementById('teachingExperienceE').value
    );
    form.append('desiredClass', document.getElementById('desiredClassE').value);
    // form.append('cv', document.getElementById('cv').files[0]);
    form.append('appliedStatus', 'pending');

    updateSettings(form, 'data');
  });
// if (upgradeTutorForm)
//   upgradeTutorForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const form = new FormData();
//     form.append('role', document.getElementById('role').value);
//     form.append('appliedStatus', 'upgraded');

//     updateSettings(form, 'data');
//   });

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

if (notesFilter) {
  notesFilter.addEventListener('submit', (e) => {
    e.preventDefault();
    const subject = document.getElementById('subject').value;
    const className = document.getElementById('className').value;

    filterNotes(subject, className);
  });
}

if (uploadNotesForm)
  uploadNotesForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();

    form.append('name', document.getElementById('name').value);
    form.append('className', document.getElementById('className').value);
    form.append('language', document.getElementById('language').value);
    form.append('subject', document.getElementById('subject').value);
    form.append('avtar', document.getElementById('avtar').files[0]);
    form.append('notespdf', document.getElementById('notespdf').files[0]);
    form.append('userId', document.getElementById('userId').value);

    uploadNote(form, 'data');
  });

if (createBlogForm)
  createBlogForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();

    form.append('blogHeading', document.getElementById('blogHeading').value);
    form.append('category', document.getElementById('category').value);
    form.append(
      'blogSubContent',
      document.getElementById('blogSubContent').value
    );
    form.append('blogContent', document.getElementById('blogContent').value);
    form.append('metaTitle', document.getElementById('metaTitle').value);
    form.append(
      'metaDescription',
      document.getElementById('metaDescription').value
    );
    form.append('metaKeywords', document.getElementById('metaKeywords').value);
    form.append('moreTags', document.getElementById('moreTags').value);
    form.append('blogImage', document.getElementById('blogImage').files[0]);
    form.append('author', document.getElementById('author').value);

    createBlog(form, 'data');
  });

if (askQuestionForm) {
  askQuestionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const question = document.getElementById('question').value;
    const subject = document.getElementById('subject').value;
    const userId = document.getElementById('userId').value;
    // console.log(userId);
    createQuestion(question, subject, userId);
  });
}
if (searchQuestionForm) {
  searchQuestionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const question = document.getElementById('question').value;
    const subject = document.getElementById('subject').value;
    searchQuestion(question, subject);
  });
}
if (searchQuestionFormIndex) {
  searchQuestionFormIndex.addEventListener('submit', (e) => {
    e.preventDefault();

    const question = document.getElementById('question').value;
    const subject = document.getElementById('subject').value;
    searchQuestion(question, subject);
  });
}

if (answerDataForm) {
  answerDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const answer = document.getElementById('answer').value;
    const question = document.getElementById('questionId').value;
    const user = document.getElementById('userId').value;

    // const { user, question } = JSON.parse(reviewDataForm.dataset.ids);
    createAnswer(answer, question, user);
  });
}
if (answersUpdate) {
  answersUpdate.addEventListener('submit', (e) => {
    e.preventDefault();
    const answer = document.getElementById('newanswer').value;
    const answerId = document.getElementById('answerId').value;

    editAnswer(answer, answerId);
  });
}
if (answersDelete) {
  answersDelete.addEventListener('submit', (e) => {
    e.preventDefault();
    const answerIdDel = document.getElementById('answerIdDel').value;

    deleteAnswer(answerIdDel);
  });
}
// if (notesDelete) {
//   notesDelete.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const noteIdDel = document.getElementByclass('noteIdDel').value;

//     deleteNote(noteIdDel);
//   });
// }
// if (blogsDelete) {
//   blogsDelete.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const blogIdDel = document.getElementByclass('blogIdDel').value;

//     deleteBlog(blogIdDel);
//   });
// }
// if (enquiryDelete) {
//   enquiryDelete.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const enquiryIdDel = document.getElementByclass('enquiryIdDel').value;

//     deleteEnquiry(enquiryIdDel);
//   });
// }
// if (answers)
//   answers.addEventListener('click', (e) => {
//     if (e.target.tagName === 'BUTTON') {
//       const button = e.target;
//       const answersCard = button.closest('#answers__card');
//       const answers = answersCard.parentNode;
//       if (button.textContent === 'Delete') {
//         const answerId = button.dataset.answerId;
//         deleteAnswer(answerId);
//         setTimeout(() => {
//           answers.removeChild(answersCard);
//         }, 500);
//       } else if (button.textContent === 'Edit') {
//         const answerText = answersCard.querySelector('.answers__text');
//         const answerRatingBox = answersCard.querySelector('.answers__rating');

//         /// Cancel button
//         let cancel = document.createElement('button');
//         cancel.className = 'answer__change answer__cancel';
//         cancel.id = 'answer__cancel';
//         cancel.textContent = 'Cancel';
//         cancel.setAttribute('data-answer-text', answerText.textContent);

//         /// Find the rating number
//         const stars = answersCard.querySelectorAll('.answers__star--active');

//         // Inputanswer
//         const inputAnswer = document.createElement('textarea');
//         inputAnswer.style.width = '25.8rem';
//         inputAnswer.className = 'answers__text';
//         inputAnswer.value = answerText.textContent;

//         // InputRating
//         const inputRating = document.createElement('input');
//         inputRating.className = 'answers__rating-input';
//         inputRating.type = 'number';
//         inputRating.value = stars.length;

//         answersCard.insertBefore(inputRnswer, answerText);
//         answersCard.insertBefore(inputRating, answerRatingBox);
//         answersCard.append(cancel);

//         answersCard.removeChild(answerText);
//         button.textContent = 'Save';
//         button.setAttribute('data-answer-id', button.dataset.answerId);
//       } else if (button.textContent === 'Cancel') {
//         const cancelBtn = answersCard.querySelector('.answer__cancel');
//         const editBtn = answersCard.querySelector('.answer__edit');
//         const answerTextContent = cancelBtn.dataset.answerText;
//         const inputAnswer = answersCard.querySelector('.answers__text');
//         const inputRating = answersCard.querySelector('.answers__rating-input');

//         const answerText = document.createElement('p');
//         answerText.className = 'answers__text';
//         answerText.textContent = answerTextContent;

//         answersCard.insertBefore(answerText, inputAnswer);

//         answersCard.removeChild(inputAnswer);
//         answersCard.removeChild(inputRating);

//         answersCard.removeChild(cancelBtn);
//         editBtn.textContent = 'Edit';
//       } else if (button.textContent === 'Save') {
//         const inputAnswer = answersCard.querySelector('.answers__text');
//         const inputRating = answersCard.querySelector('.answers__rating-input');
//         const cancelBtn = answersCard.querySelector('.answer__cancel');
//         answersCard.removeChild(cancelBtn);

//         const answerText = document.createElement('p');
//         answerText.className = 'answers__text';
//         answerText.textContent = inputAnswer.value;
//         answersCard.insertBefore(answerText, inputAnswer);

//         answersCard.removeChild(inputAnswer);
//         answersCard.removeChild(inputRating);

//         editAnswer(
//           +inputRating.value,
//           answerText.textContent,
//           button.dataset.answerId
//         );

//         button.textContent = 'Edit';
//       }
//     }
//   });
if (bookBtn)
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });

if (reviewDataForm) {
  reviewDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const review = document.getElementById('review').value;
    const rating = document.getElementById('rating').value;
    const { user, tour } = JSON.parse(reviewDataForm.dataset.ids);

    leaveReview(review, rating, tour, user);

    document.getElementById('review').textContent = '';
    document.getElementById('rating').textContent = '';
  });
}

if (reviews)
  reviews.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const button = e.target;
      const reviewsCard = button.closest('.reviews__card');
      const reviews = reviewsCard.parentNode;
      if (button.textContent === 'Delete') {
        const reviewId = button.dataset.reviewId;
        deleteReview(reviewId);
        setTimeout(() => {
          reviews.removeChild(reviewsCard);
        }, 500);
      } else if (button.textContent === 'Edit') {
        const reviewText = reviewsCard.querySelector('.reviews__text');
        const reviewRatingBox = reviewsCard.querySelector('.reviews__rating');

        /// Cancel button
        let cancel = document.createElement('button');
        cancel.className = 'review__change review__cancel';
        cancel.id = 'review__cancel';
        cancel.textContent = 'Cancel';
        cancel.setAttribute('data-review-text', reviewText.textContent);

        /// Find the rating number
        const stars = reviewsCard.querySelectorAll('.reviews__star--active');

        // InputReview
        const inputReview = document.createElement('textarea');
        inputReview.style.width = '25.8rem';
        inputReview.className = 'reviews__text';
        inputReview.value = reviewText.textContent;

        // InputRating
        const inputRating = document.createElement('input');
        inputRating.className = 'reviews__rating-input';
        inputRating.type = 'number';
        inputRating.value = stars.length;

        reviewsCard.insertBefore(inputReview, reviewText);
        reviewsCard.insertBefore(inputRating, reviewRatingBox);
        reviewsCard.append(cancel);

        reviewsCard.removeChild(reviewText);
        button.textContent = 'Save';
        button.setAttribute('data-review-id', button.dataset.reviewId);
      } else if (button.textContent === 'Cancel') {
        const cancelBtn = reviewsCard.querySelector('.review__cancel');
        const editBtn = reviewsCard.querySelector('.review__edit');
        const reviewTextContent = cancelBtn.dataset.reviewText;
        const inputReview = reviewsCard.querySelector('.reviews__text');
        const inputRating = reviewsCard.querySelector('.reviews__rating-input');

        const reviewText = document.createElement('p');
        reviewText.className = 'reviews__text';
        reviewText.textContent = reviewTextContent;

        reviewsCard.insertBefore(reviewText, inputReview);

        reviewsCard.removeChild(inputReview);
        reviewsCard.removeChild(inputRating);

        reviewsCard.removeChild(cancelBtn);
        editBtn.textContent = 'Edit';
      } else if (button.textContent === 'Save') {
        const inputReview = reviewsCard.querySelector('.reviews__text');
        const inputRating = reviewsCard.querySelector('.reviews__rating-input');
        const cancelBtn = reviewsCard.querySelector('.review__cancel');
        reviewsCard.removeChild(cancelBtn);

        const reviewText = document.createElement('p');
        reviewText.className = 'reviews__text';
        reviewText.textContent = inputReview.value;
        reviewsCard.insertBefore(reviewText, inputReview);

        reviewsCard.removeChild(inputReview);
        reviewsCard.removeChild(inputRating);

        editReview(
          +inputRating.value,
          reviewText.textContent,
          button.dataset.reviewId
        );

        button.textContent = 'Edit';
      }
    }
  });

const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 6);
