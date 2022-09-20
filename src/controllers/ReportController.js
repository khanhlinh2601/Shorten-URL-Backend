const Report = require('../models/Report');
const { AsyncCatch } = require('../utilities/error');
const { BadRequest, NotFound } = require('../utilities/errorHelper');
const validator = require('../validators/index');
const getAllReportByAccountId = AsyncCatch(async (req, res) => {
  const { error, value } = validator(['account_id'], req.params);
  if (error) {
    throw new BadRequest(error.message);
  }
  const { account_id } = value;
  const reports = await Report.find({
    account_id,
  });
  if (reports.length == 0) {
    throw new NotFound('The report does not exist');
  }
  const tmp = await Report.find().populate('links').findOne({
    account_id,
  });
  let totalClicks = 0;
  let totalLinks = tmp.links.length;
  reports.forEach((report) => {
    totalClicks += report.clicks;
  });
  return res.status(200).json({
    message: `Successfully get report of user ${req.params.account_id}`,
    data: {
      account_id: req.params.account_id,
      totalClicks,
      totalLinks,
      links: tmp.links,
    },
  });
});

const getReportByAccountIdAndMonth = AsyncCatch(async (req, res) => {
  const { error, value } = validator(['account_id', 'year', 'month'], req.params);
  if (error) {
    throw new BadRequest(error.message);
  }
  const { account_id, year, month } = value;
  const monthDate = new Date(month);
  const yearDate = new Date(year);

  const tmp = await Report.find().populate('links').findOne({
    account_id,
  });
  const report = await Report.findOne({
    account_id,
  })
    .where('time')
    .gt(new Date(yearDate.getFullYear(), monthDate.getMonth()))
    .lt(new Date(yearDate.getFullYear(), monthDate.getMonth() + 1));
  if (!report) {
    throw new BadRequest('The report does not exist');
  }
  return res.status(200).json({
    message: `Successfully get report of user ${req.params.account_id}`,
    data: {
      account_id: report.account_id,
      time: report.time,
      clicks: report.clicks,
      links: tmp.links,
    },
  });
});
module.exports = {
  getAllReportByAccountId,
  getReportByAccountIdAndMonth,
};
