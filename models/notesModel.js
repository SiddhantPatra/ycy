const mongoose = require('mongoose');
const slugify = require('slugify');

const notesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A note must have a title'],
      trim: true, 
    },
    slug: String,
    className: {
      type: String,
      required: [true, 'A note must have a class'],
    },
    language: {
      type: String,
      required: [true, 'A note must have a language'],
    },
    subject: {
      type: String,
      required: [true, 'A note must have a subject'],
    },
    creationOn: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    avtar: {
      type: String,
      default: 'default.jpg',
    },
    notespdf: {
      type: String,
      default: 'default.jpg',
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'notes must belong to a user.'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

notesSchema.index({ slug: 1 });
notesSchema.index({ user: 1 });

// Populating notes
notesSchema.pre(/^find/, function () {
  this.populate({
    path: 'userId',
    select: ' name photo role ',
  });
  this.populate({
    path: 'creationOn',
    select: 'createdOn',
  });
  this.populate({
    path: 'subject',
    select: 'subject',
  });
  this.populate({
    path: 'className',
    select: 'className',
  });
  this.populate({
    path: 'language',
    select: 'language',
  });
});

notesSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
notesSchema.post('save', function (next) {
  this.slug = slugify(this.name, { lower: true }); 
});
const Notes = mongoose.model('Notes', notesSchema);

module.exports = Notes;
