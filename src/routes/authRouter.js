const router = require('express').Router();
const passport = require('passport');
const jwtMethod = require('../utilities/jwt');
const config = require('../config');
const Account = require('../models/Account');
const { Forbidden } = require('../utilities/errorHelper');
const { AsyncCatch } = require('../utilities/error');
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  }),
);
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
  }),
  AsyncCatch(async (req, res, next) => {
    const acc = await Account.findOne({
      email: req.user.email,
    });
    if (acc.status === 'waiting') {
      throw new Forbidden('The account is waiting to allow access');
    }
    if (acc.status === 'reject') {
      throw new Forbidden('The account is reject to allow access');
    }
    const { email, role, _id } = acc;
    const token = await jwtMethod.generateToken(
      {
        _id,
        email,
        role,
      },
      config.ACCESS_TOKEN_SECRET,
      config.ACCESS_TOKEN_LIFE,
    );
    res.redirect(`${config.URL_HOST}/api/auth?success=true&token=${token}`);
    res.end();
  }),
);

module.exports = router;
