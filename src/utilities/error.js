const {
  STATUS_CODE,
  BadRequest,
  Forbidden,
  BaseError,
  NotFound,
  Unauthorized,
} = require('./errorHelper');

const AsyncCatch = (fn) => {
  return (req, res, next) => fn(req, res, next).catch(next);
};

require('dotenv').config();

const handleError = (err, req, res, next) => {
  if (err instanceof BaseError) {
    return res.status(err.getCode()).json({
      message: err.message,
    });
  }
  console.log(err);
  res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
    message: 'Something went wrong!',
  });
};

module.exports = {
  AsyncCatch,
  handleError,
};
