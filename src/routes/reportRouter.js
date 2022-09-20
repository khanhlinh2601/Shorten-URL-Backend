const router = require('express').Router();
const ReportController = require('../controllers/ReportController');

router.get('/:account_id', ReportController.getAllReportByAccountId);
router.get('/:account_id/:year/:month', ReportController.getReportByAccountIdAndMonth);
module.exports = router;
/**
 * @swagger
 * paths:
 *  /api/report/{account_id}:
 *      get:
 *          tags: [Reports]
 *          summary: get an report total click and link of a user
 *          parameters:
 *              - $ref: '#/components/parameters/account_id'
 *              - $ref: '#/components/parameters/token'
 *          responses:
 *              '200':
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                                    properties:
 *                                      data:
 *                                          $ref: '#/components/schemas/Report'
 *  /api/report/{account_id}/{year}/{month}:
 *      get:
 *          tags: [Reports]
 *          summary: get an report total click and link of a user
 *          parameters:
 *              - $ref: '#/components/parameters/account_id'
 *              - $ref: '#/components/parameters/year'
 *              - $ref: '#/components/parameters/month'
 *              - $ref: '#/components/parameters/token'
 *          responses:
 *              '200':
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                                    properties:
 *                                      data:
 *                                          $ref: '#/components/schemas/Report'
 *
 * components:
 *  parameters:
 *      account_id:
 *          in: path
 *          name: account_id
 *          required: true
 *          schema:
 *              type: string
 *      month:
 *          in: path
 *          name: month
 *          required: true
 *          schema:
 *              type: string
 *      year:
 *          in: path
 *          name: year
 *          required: true
 *          schema:
 *              type: string
 *  schemas:
 *      Report:
 *          type: object
 *          properties:
 *              account_id:
 *                  type: string
 *                  description: the id account
 *                  example: '6320b5367877ab2b77ee3a2b'
 *              totalClicks:
 *                  type: number
 *                  description: total click in link of user create
 *                  example: 9
 *              totalLinks:
 *                  type: number
 *                  description: total link of user create
 *                  example: 2
 *              links:
 *                  type: array
 *                  description:  link user create
 *                  example:
 *                      - $ref: '#/components/schemas/URL'
 *
 */
