/* eslint-disable */

import { showAlert } from './alerts';

import axios from 'axios';

export const uploadNote = async (data, type) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/notes',
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Note Created Successfully');
      window.setImmediate(() => {
        // location.assign('/');
        location.assign('/view-notes');
      }, 500);
    } else {
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
export const deleteNote = async (noteId) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/v1/notes/${noteId}`,
    });

    if (res.status === 204) {
      showAlert('success', 'Note was succesfully deleted!');
      window.setTimeout(() => {
        location.reload(true);
      }, 600);
    }
  } catch (err) {
    showAlert('error', 'Error with deleting Note!');
  }
};
export const filterNotes = async (subject, className) => {
  try {
    let url;
    if (subject === '' && className != '') {
      url = `/view-notes-className/${encodeURIComponent(className)}`;
    } else if (subject != '' && className == '') {
      url = `/view-notes-subject/${encodeURIComponent(subject)}`;
    } else if (subject != '' && className != '') {
      url = `/view-notes/${encodeURIComponent(subject)}/${encodeURIComponent(
        className
      )}`;
    }
    window.setTimeout(() => {
      location.assign(`${url}`);
    }, 100);
    // console.log(url);
  } catch (err) {
    showAlert('error', 'Error with Filtering Note!');
  }
};
