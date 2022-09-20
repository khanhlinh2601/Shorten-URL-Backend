const envPath = `${__dirname}/../../.env`;
require('dotenv').config({
  path: envPath,
});
const {
  URL_CLIENT,
  PORT,
  MONGO_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  CALLBACKURL,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_LIFE,
  URL_HOST,
  SECRET_KEY_SESSION,
  BASE_URL,
} = process.env;
switch (process.env.NODE_ENV || 'development') {
  case 'production':
    DB_NAME = `FCodeShortenURL`;
    break;
  case 'development':
    DB_NAME = `ShortenURL`;
    break;
}
module.exports = {
  URL_CLIENT,
  PORT,
  MONGO_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  CALLBACKURL,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_LIFE,
  URL_HOST,
  SECRET_KEY_SESSION,
  BASE_URL,
  DB_NAME,
};
