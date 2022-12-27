const path = require('path');
const multer = require('multer');
const Notes = require('../models/notesModel');

const catchAsync = require('../utils/catchAsync');

const AppError = require('../utils/appError');
const factory = require('../controllers/handlerFactory');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/notes');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});
const multerFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith('image') ||
    file.mimetype.startsWith('application')
  ) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        'Not an image/pdf file !!! Please upload only images/pdf.',
        404
      ),
      false
    );
  }
};
const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, //100 mb
  filter: multerFilter,
});
exports.cpUpload = upload.fields([
  { name: 'avtar', maxCount: 1 },
  { name: 'notespdf', maxCount: 1 },
]);

exports.createNote = catchAsync(async (req, res, next) => {
  if (req.files) {
    req.body.avtar = req.files.avtar[0].filename;
    req.body.notespdf = req.files.notespdf[0].filename;
  }

  const uploadnotes = await Notes.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      data: uploadnotes,
    },
  });
});

exports.getNoteSubject = catchAsync(async (req, res, next) => {
  const notes = await Notes.find({ subject: req.params.subject }).sort({
    createdOn: -1,
  });
  res.status(200).render('view_notes', {
    title: 'View Notes Subject',
    notes,
  });
});
exports.getNoteClassName = catchAsync(async (req, res, next) => {
  const notes = await Notes.find({ className: req.params.className }).sort({
    createdOn: -1,
  });
  res.status(200).render('view_notes', {
    title: 'View Notes Class ',
    notes,
  });
});
exports.getNoteboth = catchAsync(async (req, res, next) => {
  const notes = await Notes.find({
    subject: req.params.subject,
    className: req.params.className,
  }).sort({
    createdOn: -1,
  });

  res.status(200).render('view_notes_both_filter', {
    title: 'View Notes ',
    notes,
  });
});

exports.getAllNotes = factory.getAll(Notes);
exports.getNote = factory.getOne(Notes, {
  path: ' users',
});
exports.updateNote = factory.updateOne(Notes);
exports.deleteNote = factory.deleteOne(Notes);
