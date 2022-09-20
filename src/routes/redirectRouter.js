const router = require('express').Router();
const RedirectController = require('../controllers/RedirectController');
router.get('/:linkcode', RedirectController.getOriginLink);
module.exports = router;

/**
 * @swagger
 * paths:
 *  /{linkcode}:
 *      get:
 *          tags: [URL]
 *          summary: redirect origin link
 *          parameters:
 *              - $ref: '#/components/parameters/linkcode'
 *          responses:
 *              '200':
 *                  description: successful and redirect origin link
 * components:
 *  parameters:
 *      linkcode:
 *          in: path
 *          name: linkcode
 *          required: true
 *          schema:
 *              type: string
 *          description: the code of shorten link
 */
