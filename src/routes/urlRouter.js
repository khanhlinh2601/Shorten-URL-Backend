const router = require('express').Router();
const URLController = require('../controllers/URLController');

router.post('/shorten', URLController.createShortenLink);
module.exports = router;

/**
 * @swagger
 * paths:
 *  /api/url/shorten/:
 *     post:
 *          tags: [URL]
 *          summary: make the link shorten
 *          parameters:
 *            - $ref: '#/components/parameters/token'
 *          requestBody:
 *              $ref: '#/components/origin_link'
 *          responses:
 *              '200':
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                                    properties:
 *                                      data:
 *                                          $ref: '#/components/schemas/URL'
 * components:
 *      origin_link:
 *          description: the link user want shorten
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          origin_link:
 *                              type: string
 *                          account_id:
 *                              type: string
 *
 *
 *      schemas:
 *          URL:
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                      description: the id of url
 *                      example: '6320bb2a1934f2d9b45f146f'
 *                  account_id:
 *                      type: string
 *                      description: the id of google account
 *                      example: '103680002921481268729'
 *                  origin_link:
 *                      type: string
 *                      description: the link user want shorten
 *                      example: 'https://www.youtube.com/'
 *                  shorten_link:
 *                      type: string
 *                      description:  the shorten link
 *                      example: 'http://localhost:5000/WOnHa1Jlu'
 *                  clicks:
 *                      type: number
 *                      description: the number of using shorten links
 *                      example: 2
 *                  createdAt:
 *                      type: string
 *                      example: '2022-09-14T04:05:28.938Z'
 */
