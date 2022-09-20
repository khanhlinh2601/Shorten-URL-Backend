const Report = require('../models/Report');
const URL = require('../models/URL');
const config = require('../config');
const { NotFound } = require('../utilities/errorHelper');
const { AsyncCatch } = require('../utilities/error');
const getOriginLink = AsyncCatch(async (req, res) => {
  const date = new Date();
  const link = await URL.findOne({
    shorten_link: `${config.BASE_URL}/${req.params.linkcode}`,
  });
  if (!link) {
    throw new NotFound('Not found!');
  }
  const report = await Report.findOne({
    account_id: link.account_id,
  })
    .where('time')
    .gt(new Date(date.getFullYear(), date.getMonth()))
    .lt(new Date(date.getFullYear(), date.getMonth() + 1));
  const clicks = link.clicks + 1;
  const clicksReport = report.clicks + 1;
  await URL.updateOne(
    {
      _id: link._id,
    },
    {
      clicks,
    },
  );
  await Report.updateOne(
    {
      _id: report._id,
    },
    {
      clicks: clicksReport,
    },
  );
  return res.redirect(link.origin_link);
});
module.exports = {
  getOriginLink,
};
