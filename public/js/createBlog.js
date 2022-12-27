/* eslint-disable */

import { showAlert } from './alerts';

import axios from 'axios';

export const createBlog = async (data, type) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/blogs',
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Blog Created Successfully');
      window.setImmediate(() => {
        // location.assign('/');
        location.assign('/view-blogs');
      }, 500);
    } else {
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
export const deleteBlog = async (blogId) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/v1/blogs/${blogId}`,
    });

    if (res.status === 204) {
      showAlert('success', 'Blog was succesfully deleted!');
      window.setTimeout(() => {
        location.reload(true);
      }, 600);
    }
  } catch (err) {
    showAlert('error', 'Error with deleting Blog!');
  }
};
