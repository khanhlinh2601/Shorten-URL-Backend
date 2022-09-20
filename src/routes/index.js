const router = require('express').Router();
const authRouter = require('./authRouter');
const redirectRouter = require('./redirectRouter');
const reportRouter = require('./reportRouter');
const urlRouter = require('./urlRouter');
const userRouter = require('./userRouter');
const adminRouter = require('./adminRouter');
const swagger = require('./swagger');
const Authenticate = require('../middleware/Authenticate');
const isAdmin = require('../middleware/isAdmin');
const session = require('express-session');
const config = require('../config');

router.use(
  session({
    secret: config.SECRET_KEY_SESSION,
    resave: false,
    saveUninitialized: false,
  }),
);

router.use('/api-docs', swagger);
router.use('/api/auth', authRouter);
router.use('/api/user', Authenticate, userRouter);
router.use('/api/url', Authenticate, urlRouter);
router.use('/api/report', Authenticate, reportRouter);
router.use('/api/admin', Authenticate, isAdmin, adminRouter);
router.use('/', redirectRouter);
module.exports = router;
