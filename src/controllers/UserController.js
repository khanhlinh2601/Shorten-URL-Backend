const Account = require('../models/Account');
const { AsyncCatch } = require('../utilities/error');
const { Unauthorized } = require('../utilities/errorHelper');

const getUserById = AsyncCatch(async (req, res) => {
  const user = await Account.findOne({
    _id: req.params.account_id,
  });
  if (!user) {
    throw new Unauthorized('The user does not exist');
  }
  return res.status(200).json({
    message: `Successfully get user`,
    data: user,
  });
});

module.exports = {
  getUserById,
};
