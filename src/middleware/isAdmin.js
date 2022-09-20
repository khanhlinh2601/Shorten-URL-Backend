const router = require('express').Router();
const accRole = require('../utilities/accRole');
const { AsyncCatch } = require('../utilities/error');
const { Unauthorized, Forbidden } = require('../utilities/errorHelper');
const isAdmin = AsyncCatch(async (req, res, next) => {
  const { role } = req.user;
  if (!role) {
    throw new Forbidden('Access denied');
  }
  if (role != accRole.ADMIN) {
    throw new Unauthorized('The user is not admin');
  }
  return next();
});
router.use(isAdmin);

module.exports = isAdmin;
