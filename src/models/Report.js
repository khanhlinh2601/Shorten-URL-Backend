const mongoose = require('mongoose');
const ReportSchema = new mongoose.Schema(
  {
    account_id: {
      type: String,
    },
    time: {
      type: Date,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    links: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'URL',
      },
    ],
  },
  {
    collection: 'Report',
  },
);
module.exports = mongoose.model('Report', ReportSchema);
