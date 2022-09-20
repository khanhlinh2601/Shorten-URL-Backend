const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./src/config');
const { db } = require('./src/services/index');
const app = express();
const bodyParser = require('body-parser');
const router = require('./src/routes/index');
const session = require('express-session');
const { handleError } = require('./src/utilities/error');
require('./src/services/index').passport;
app.use((err, req, res, next) => {
  //error handle oauth
  if (err) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'Unauthorized',
      },
    });
  }
});

app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

// parse application/json
app.use(bodyParser.json());

db.connect();
app.use(
  cors({
    origin: process.env.URL_CLIENT,
  }),
);

app.use(morgan('combined'));
app.use(router);

app.use((req, res) => {
  //
  return res.status(404).json({
    success: false,
    error: {
      message: 'Unable to locate the request resource',
    },
  });
});

app.use(handleError);
app.listen(config.PORT, () => {
  console.log(`Example app listening on port ${config.PORT}`);
});
