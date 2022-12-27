const express = require('express');

const blogController = require('./../controllers/blogController');

const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/view-blogs')
  .get(authController.isLoggedIn, blogController.getAllBlogs);
router
  .route('/:id/blog')
  .get(authController.isLoggedIn, blogController.getBlog);

router
  .route('/')
  .get(blogController.getAllBlogs)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    blogController.cpUpload,
    blogController.createBlog
  );

router
  .route('/:id')
  .get(blogController.getBlog)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    blogController.deleteBlog
  );
 
module.exports = router;
