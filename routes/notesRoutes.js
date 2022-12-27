const express = require('express');

const notesController = require('./../controllers/notesController');

const authController = require('../controllers/authController');

const router = express.Router();

router.route('/view-notes').get(notesController.getAllNotes);
router
  .route('/view-notes-subject/:subject')
  .get(notesController.getNoteSubject);
router
  .route('/view-notes-className/:className')
  .get(notesController.getNoteClassName);
router
  .route('/view-notes/:subject/:className')
  .get(notesController.getNoteboth);
 
router
  .route('/')
  .get(notesController.getAllNotes)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'teacher', 'user'),
    notesController.cpUpload,
    notesController.createNote
  );

router
  .route('/:id')
  .get(notesController.getNote)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'teacher', 'user'),
    notesController.deleteNote
  ); 

module.exports = router;
