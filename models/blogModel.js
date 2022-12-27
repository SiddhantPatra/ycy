const mongoose = require('mongoose');
const slugify = require('slugify');

const blogSchema = new mongoose.Schema(
  {
    blogHeading: {
      type: String,
      required: [true, 'A blog must have a title'],
      trim: true,
    },
    slug: String,
    blogSubContent: {
      type: String,
      required: [true, 'A blog must have a  Sub-Content'],
    },
    blogContent: {
      type: String,
      required: [true, 'A blog must have a Content'],
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    metaKeywords: {
      type: String,
    },
    moreTags: {
      type: String,
    },
    category: {
      type: String,
      required: [true, 'A blog must have a category'],
      enum: {
        values: ['Tutors', 'Students', 'Education', 'Success Story'],
        message:
          'category is either: Tutors,Students,Education,Success Story  respectively',
      },
    },
    createdOn: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    blogImage: {
      type: String,
      default: 'default.jpg',
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'blog must belong to a user.'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

blogSchema.index({ slug: 1 });
blogSchema.index({ user: 1 }); 
// Populating blog
blogSchema.pre(/^find/, function () {
  this.populate({
    path: 'author',
    select: ' name photo role ',
  });
  this.populate({
    path: 'createdOn',
    select: 'createdOn',
  }); 
});

blogSchema.pre('save', function (next) {
  this.slug = slugify(this.blogHeading, { lower: true });
  next();
});
blogSchema.post('save', function (next) {
  this.slug = slugify(this.blogHeading, { lower: true }); 
});
const Blogs = mongoose.model('Blogs', blogSchema);

module.exports = Blogs;
