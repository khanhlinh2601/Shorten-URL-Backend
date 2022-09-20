const router = require('express').Router();
const AdminController = require('../controllers/AdminController');

router.get('/', AdminController.getAllUserAccount);
router.put('/role', AdminController.updateRoleOfUserAccount);
router.put('/status', AdminController.updateStatusOfUserAccount);
router.post('/account', AdminController.createAccount);
// TODO: update role (status = accept)
//      default AVATAR  F-CODE
module.exports = router;

/**
 * @swagger
 * paths:
 *  /api/admin/:
 *      get:
 *          tags: [Admin]
 *          summary: get all info user
 *          parameters:
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
 *  /api/admin/account:
 *      post:
 *          tags: [Admin]
 *          summary: create account
 *          parameters:
 *              - $ref: '#/components/parameters/token'
 *          requestBody:
 *                $ref: '#/components/create_account'
 *          responses:
 *              '200':
 *                  description: Create successful
 *  /api/admin/status:
 *      put:
 *          tags: [Admin]
 *          summary: update status for user
 *          parameters:
 *              - $ref: '#/components/parameters/token'
 *          requestBody:
 *                $ref: '#/components/update_status'
 *          responses:
 *              '200':
 *                  description: Update successful
 *  /api/admin/role:
 *      put:
 *          tags: [Admin]
 *          summary: update role for user
 *          parameters:
 *              - $ref: '#/components/parameters/token'
 *          requestBody:
 *                $ref: '#/components/update_role'
 *          responses:
 *              '200':
 *                  description: Update successful
 * components:
 *      update_status:
 *          description: account_id do you want update, enter status "waiting", "reject", "accept"
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          status:
 *                              type: string
 *                          account_id:
 *                              type: string
 *      update_role:
 *          description: account_id do you want update, enter role user = "0", admin = "1"
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          role:
 *                              type: string
 *                          account_id:
 *                              type: string
 *      create_account:
 *          description: create account, enter role user = "0", admin = "1"
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          first_name:
 *                              type: string
 *                          last_name:
 *                              type: string
 *                          role:
 *                              type: string
 */
