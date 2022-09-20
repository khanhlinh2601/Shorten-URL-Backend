const shortid = require('shortid');
const URL = require('../models/URL');
const Report = require('../models/Report');
const config = require('../config');
const validator = require('../validators/index');
const { BadRequest } = require('../utilities/errorHelper');
const { AsyncCatch } = require('../utilities/error');

const createShortenLink = AsyncCatch(async (req, res) => {
  const { error, value } = validator(['origin_link', 'account_id'], req.body);
  if (error) {
    throw new BadRequest(error.message);
  }
  const { origin_link, account_id } = value;

  const linkCode = shortid.generate();

  //find database link
  const link = await URL.findOne({
    origin_link,
  });
  const report = await Report.findOne({
    account_id,
    month: new Date().getMonth() + 1,
  });

  if (link) {
    return res.status(200).json({
      data: link,
    });
  }

  const shorten_link = `${config.BASE_URL}/${linkCode}`;
  const newLink = await new URL({
    account_id,
    origin_link,
    shorten_link,
  }).save();
  const tmp = await URL.findOne({
    origin_link: newLink.origin_link,
  });
  report.links.push(tmp._id.valueOf());
  report.save();
  return res.status(200).json({
    data: newLink,
  });
});
module.exports = {
  createShortenLink,
};
