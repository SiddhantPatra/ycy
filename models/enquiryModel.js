const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');

const slugify = require('slugify');
const validatePhoneNumber = require('validate-phone-number-node-js');

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please tell us your name!'],
    },
    slug: String,
    email: {
      type: String,
      required: [true, 'Please tell us your email'],
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    contact: {
      type: String,
      required: [true, 'Please tell us your Phone number'],
      validate: [
        validatePhoneNumber.validate,
        'Please provide a valid Phone number',
      ],
    },
    message: {
      type: String,
      required: [true, 'Please tell us your message'],
    },
    creationOn: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

enquirySchema.index({ slug: 1 });
enquirySchema.pre('save', function (next) {
  this.slug = slugify(this.message, { lower: true });
  next();
});
enquirySchema.post('save', function (next) {
  this.slug = slugify(this.message, { lower: true });
});
const Enquiry = mongoose.model('Enquiry', enquirySchema);
module.exports = Enquiry;
