/* eslint-disable */

import { showAlert } from './alerts';

import axios from 'axios';

export const createEnquiry = async (name, email, contact, message) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/enquiries',
      data: { name, email, contact, message },
    });
    console.log(name, email, contact, message);
    console.log('hello');
    if (res.data.status === 'success') {
      showAlert('success', 'Messsage Sent Successfully');
      window.setImmediate(() => {
        location.assign('/');
      }, 500);
    } else {
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
export const deleteEnquiry = async (enquiryId) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/v1/enquiries/${enquiryId}`,
    });

    if (res.status === 204) {
      showAlert('success', 'Enquiry was succesfully deleted!');
      window.setTimeout(() => {
        location.reload(true);
      }, 500);
    }
  } catch (err) {
    showAlert('error', 'Error with deleting Enquiry!');
  }
};
