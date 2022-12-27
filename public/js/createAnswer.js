/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const createAnswer = async (answer, question, user) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/v1/questions/${question}/answers`,
      data: {
        answer,
        question,
        user,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Answer was succesfully uploaded!');
      window.setTimeout(() => {
        location.reload(true);
      }, 500);
    }
  } catch (err) {
    showAlert('error', 'You can leave only one Answer.');
  }
};

export const editAnswer = async (answer, answerId) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/answers/${answerId}`,
      data: {
        answer,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Answer was succesfully edited!');
      window.setTimeout(() => {
        location.reload(true);
      }, 1000);
    }
  } catch (err) {
    showAlert('error', 'Error with editing answer!');
  }
};

export const deleteAnswer = async (answerId) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/v1/answers/${answerId}`,
    });

    if (res.status === 204) {
      showAlert('success', 'answer was succesfully deleted!');
      window.setTimeout(() => {
        location.reload(true);
      }, 600);
    }
  } catch (err) {
    showAlert('error', 'Error with deleting answer!');
  }
};

export const updatelikeAnswer = async (likes, answerId) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/answers/${answerId}`,
      data: {
        likes,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'answer was succesfully edited!');
      window.setTimeout(() => {
        location.reload(true);
      }, 1000);
    }
  } catch (err) {
    showAlert('error', 'Error with editing answer!');
  }
};
