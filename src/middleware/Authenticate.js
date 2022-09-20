const jwt = require('../utilities/jwt');
const config = require('../config/index');
const { AsyncCatch } = require('../utilities/error');
const { Unauthorized } = require('../utilities/errorHelper');
const router = require('express').Router();

const Authenticate = AsyncCatch(async (req, res, next) => {
  const verifyToken = await jwt
    .verifyToken(req.headers.token, config.ACCESS_TOKEN_SECRET)
    .then((token) => token);
  if (!verifyToken) {
    throw new Unauthorized('Unauthoried');
  }
  req.user = verifyToken.payload;
  return next();
});

router.use(Authenticate);

module.exports = Authenticate;
