const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const router = require('express').Router();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'F-Code Shorten URL API',
      version: '1.0.0',
      description: 'API for F-Code Shorten URL',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);
router.use('/', swaggerUI.serve, swaggerUI.setup(specs));

module.exports = router;
