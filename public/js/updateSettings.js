/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

// type os either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? '/api/v1/users/updateMyPassword'
        : '/api/v1/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });
    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
      window.setTimeout(() => {
        location.assign('/me');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
export const upgradeTutor = async (role, appliedStatus, tutorId) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/users/${tutorId}`,
      data: {
        role,
        appliedStatus,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'User was succesfully edited!');
      window.setTimeout(() => {
        location.reload(true);
      }, 1000);
    }
  } catch (err) {
    showAlert('error', 'Error with editing answer!');
  }
};
export const banTutor = async (active, restrictions, tutorId) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/users/${tutorId}`,
      data: {
        active,
        restrictions,
      },
    });

    if (res.status === 204) {
      showAlert('success', 'User was succesfully banned!');
      window.setTimeout(() => {
        location.reload(true);
      }, 200);
    }
  } catch (err) {
    showAlert('error', 'Error with banning User!');
    window.setTimeout(() => {
      location.reload(true);
    }, 200);
  }
};
export const deleteUser = async (noteId) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/v1/users/${noteId}`,
    });

    if (res.status === 204) {
      showAlert('success', 'User was succesfully deleted!');
      window.setTimeout(() => {
        location.reload(true);
      }, 600);
    }
  } catch (err) {
    showAlert('error', 'Error with deleting user!');
  }
};
