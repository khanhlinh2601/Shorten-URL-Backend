const Account = require('../models/Account');
const Report = require('../models/Report');
const { AsyncCatch } = require('../utilities/error');
const { BadRequest, NotFound, Unauthorized } = require('../utilities/errorHelper');
const validator = require('../validators/index');
//create account
const createAccount = AsyncCatch(async (req, res) => {
  const { error, value } = validator(['email', 'first_name', 'last_name', 'role'], req.body);
  if (error) {
    throw new BadRequest(error.message);
  }
  const { email, first_name, last_name, role } = value;
  const account = await Account.findOne({
    email,
  });
  if (account) {
    throw new BadRequest('Email is exist');
  }
  const result = await new Account({
    email,
    first_name,
    last_name,
    role,
    status: 'accept',
    avatar:
      'https://scontent.fsgn5-12.fna.fbcdn.net/v/t39.30808-6/306532790_3219170138299543_3944910915599319713_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=uuhJT5-Cd1QAX9G9ppv&_nc_ht=scontent.fsgn5-12.fna&oh=00_AT9Nx6oFJ6JmuNRqiyNMuYuZptKDNLnQALCfXwLNkrONMw&oe=6325DFC9',
  }).save();

  if (!result) {
    throw new BadRequest('Can not access database');
  }
  const report = await new Report({
    account_id: result._id,
    time: new Date(),
  }).save();
  if (!report) {
    throw new BadRequest('Can not access database');
  }
  return res.status(200).json({
    message: 'Create successfully',
  });
});

//get all user
const getAllUserAccount = AsyncCatch(async (req, res) => {
  const users = await Account.find();
  if (users.length == 0) {
    throw new NotFound('The user does not exist');
  }
  return res.status(200).json({
    message: 'Successfully get all user account',
    data: users,
  });
});
//update status user
const updateStatusOfUserAccount = AsyncCatch(async (req, res) => {
  const { error, value } = validator(['account_id', 'status'], req.body);
  if (error) {
    throw new BadRequest(error.message);
  }
  const { account_id, status } = value;
  const user = await Account.findOneAndUpdate(
    {
      _id: account_id,
    },
    {
      status,
    },
  );
  if (!user) {
    throw new NotFound('The user does not exist');
  }
  return res.status(200).json({
    message: 'Update successful',
  });
});

const updateRoleOfUserAccount = AsyncCatch(async (req, res) => {
  const { error, value } = validator(['account_id', 'role'], req.body);
  if (error) {
    throw new BadRequest(error.message);
  }
  const { account_id, role } = value;
  const user = await Account.findOne({
    _id: account_id,
  });
  if (!user) {
    throw new NotFound('The user does not exist');
  }
  if (user.status != 'accept') {
    throw new Unauthorized('The user can not update role (status must be accept)');
  }
  const userUpdate = await Account.updateOne(
    {
      _id: account_id,
    },
    {
      role,
    },
  );
  if (!userUpdate) {
    throw new BadRequest('Can not access');
  }
  return res.status(200).json({
    message: 'Update successful',
  });
});

//updateStatus

module.exports = {
  getAllUserAccount,
  updateStatusOfUserAccount,
  updateRoleOfUserAccount,
  createAccount,
};
