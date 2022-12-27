const path = require('path');
const multer = require('multer');
const Blogs = require('../models/blogModel');

const catchAsync = require('../utils/catchAsync');

const AppError = require('../utils/appError');
const factory = require('../controllers/handlerFactory');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/blogs');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(
      new AppError('Not an image file !!! Please upload only images.', 404),
      false
    );
  }
};
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, //10 mb
  filter: multerFilter,
});
exports.cpUpload = upload.fields([{ name: 'blogImage', maxCount: 1 }]);

exports.createBlog = catchAsync(async (req, res, next) => {
  if (req.files) {
    req.body.blogImage = req.files.blogImage[0].filename;
  }

  const uploadblog = await Blogs.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      data: uploadblog,
    },
  });
});

exports.getAllBlogs = factory.getAll(Blogs);
exports.getBlog = factory.getOne(Blogs);
exports.updateBlog = factory.updateOne(Blogs);
exports.deleteBlog = factory.deleteOne(Blogs);
