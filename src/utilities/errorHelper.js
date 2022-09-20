class BaseError extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
  getCode() {
    if (this.statusCode) return this.statusCode;
    if (this instanceof BadRequest) return STATUS_CODE.BAD_REQUEST;
    if (this instanceof Unauthorized) return STATUS_CODE.UNAUTHORIZED;
    if (this instanceof Forbidden) return STATUS_CODE.FORBIDDEN;
    if (this instanceof NotFound) return STATUS_CODE.NOT_FOUND;
    return STATUS_CODE.INTERNAL_SERVER_ERROR;
  }
}
class BadRequest extends BaseError {}
class Unauthorized extends BaseError {}
class Forbidden extends BaseError {}
class NotFound extends BaseError {}
const STATUS_CODE = {
  SUCCESS: 200,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  METHOD_NOT_ALLOW: 405,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
};
module.exports = {
  BaseError,
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  STATUS_CODE,
};
