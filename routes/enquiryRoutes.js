const express = require('express');

const enquiryController = require('../controllers/enquiryController');

const authController = require('../controllers/authController');

const router = express.Router();

router.route('/view-enquiry').get(enquiryController.getAllEnquiries);
router.route('/:id/enquiry').get(enquiryController.getEnquiry);

router
  .route('/')
  .get(enquiryController.getAllEnquiries)
  .post(enquiryController.createEnquiry);

router
  .route('/:id')
  .get(enquiryController.getEnquiry)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    enquiryController.deleteEnquiry
  );

module.exports = router;
