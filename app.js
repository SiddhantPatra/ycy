const path = require('path');
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const questionRouter = require('./routes/questionRoutes');
const userRouter = require('./routes/userRoutes');
const answerRouter = require('./routes/answerRoutes');
const notesRouter = require('./routes/notesRoutes');
const blogRouter = require('./routes/blogRoutes');
const enquiryRouter = require('./routes/enquiryRoutes');
const viewRouter = require('./routes/viewsRoutes');

const app = express();

app.enable('trust proxy');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());

app.options('*', cors());

app.use(express.static(path.join(__dirname, 'public')));

const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(mongoSanitize());

app.use(xss());

app.use(
  hpp({
    whitelist: [
      'duration',
      'maxGroupSize',
      'difficulty',
      'ratingsAverage',
      'ratingsQuantity',
      'price',
    ],
  })
);

app.use(compression());

app.use((req, res, next) => {
  req.requestTime = new Date().toDateString();
  next();
});

app.use('/', viewRouter);
app.use('/api/v1/questions', questionRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/answers', answerRouter);
app.use('/api/v1/notes', notesRouter);
app.use('/api/v1/blogs', blogRouter);
app.use('/api/v1/enquiries', enquiryRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
