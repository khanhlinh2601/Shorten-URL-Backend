const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
    },
    role: {
      type: String,
      default: '0',
    },
    status: {
      type: String,
      default: 'waiting',
    },
    avatar: {
      type: String,
    },
  },
  {
    collection: 'Account',
  },
);

module.exports = mongoose.model('Account', AccountSchema);
