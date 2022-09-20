const mongoose = require('mongoose');

const URLSchema = new mongoose.Schema(
  {
    account_id: {
      type: String,
    },
    origin_link: {
      type: String,
    },
    shorten_link: {
      type: String,
    },
    clicks: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: 'URL',
    timestamps: true,
  },
);

module.exports = mongoose.model('URL', URLSchema);
