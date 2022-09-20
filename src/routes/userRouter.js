const router = require('express').Router();
const UserController = require('../controllers/UserController');

router.get('/:account_id', UserController.getUserById);
module.exports = router;

/**
 * @swagger
 * paths:
 *  /api/user/{account_id}:
 *      get:
 *          tags: [Users]
 *          summary: get an information of a user
 *          parameters:
 *              - $ref: '#/components/parameters/account_id'
 *              - $ref: '#/components/parameters/token'
 *
 *          responses:
 *              '200':
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                                    properties:
 *                                      data:
 *                                          $ref: '#/components/schemas/Account'
 * components:
 *  parameters:
 *      account_id:
 *          in: path
 *          name: account_id
 *          required: true
 *          schema:
 *              type: string
 *      token:
 *          in: header
 *          name: token
 *          required: true
 *          schema:
 *              type: string
 *  schemas:
 *      Account:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *                  description: the id account
 *                  example: '6320550f27ef0a7b5a8184ba'
 *              first_name:
 *                  type: string
 *                  description: the name of google account
 *                  example: 'Khanh Linh'
 *              last_name:
 *                  type: string
 *                  description: the givenName of google account
 *                  example: 'Trinh'
 *              email:
 *                  type: string
 *                  description: personal email
 *                  example: 'linhtruong2601@gmail.com'
 *              role:
 *                  type: number
 *                  description: role 1 is admin, role 2 is user, default role 2
 *                  example: 2
 *              status:
 *                  type: string
 *                  description: 3 type (waiting, accept, reject)
 *                  example: 'waiting'
 *              avatar:
 *                  type: string
 *                  description: avatar of google account
 *                  example: "https://lh3.googleusercontent.com/a-/AFdZucr-o30KJNPWwi09E35u7xUXuDO9tCRpwEDo-rxpXw=s96-c"
 */
