/* eslint-disable */

import { showAlert } from './alerts';

import axios from 'axios';

export const createQuestion = async (question, subject, userId) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/questions',
      data: {
        question,
        subject,
        userId,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Question Generated successfully');
      window.setImmediate(() => {
        location.assign('/');
      }, 500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
export const searchQuestion = async (question, subject) => {
  try {
    let url;
    if (subject === '' && question != '') {
      url = `/search-question-question/${encodeURIComponent(question)}`;
    } else if (subject != '' && question == '') {
      url = `/search-question-subject/${encodeURIComponent(subject)}`;
    } else if (subject != '' && question != '') {
      url = `/search-question/${encodeURIComponent(
        subject
      )}/${encodeURIComponent(question)}`;
    }
    window.setTimeout(() => {
      location.assign(`${url}`);
    }, 100);
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const deleteQuestion = async (questionId) => {
  try {
    console.log(questionId);
    const res = await axios({
      method: 'DELETE',
      url: `/api/v1/questions/${questionId}`,
    });

    if (res.status === 204) {
      showAlert('success', 'Question was succesfully deleted!');
      window.setTimeout(() => {
        location.reload(true);
      }, 500);
    }
  } catch (err) {
    showAlert('error', 'Error with deleting Question!');
  }
};
