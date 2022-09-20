const accRole = require('../utilities/accRole');
const accStatus = require('../utilities/accStatus');
const regex = require('./regex');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
module.exports = (fields, values) => {
  const getSchema = (field) => {
    switch (field) {
      case 'email':
        return Joi.string()
          .email({
            minDomainSegments: 2,
          })
          .required();
      case 'first_name':
        return Joi.string().min(2).max(255).regex(regex.NAME_REGEX).trim().required();
      case 'last_name':
        return Joi.string().min(2).max(255).regex(regex.NAME_REGEX).trim().required();
      case 'role':
        return Joi.string().valid(accRole.ADMIN, accRole.USER).required();
      case 'status':
        return Joi.string()
          .lowercase()
          .valid(accStatus.WAITING, accStatus.REJECT, accStatus.ACCEPT)
          .required();
      case 'month':
        return Joi.string().regex(regex.MONTH_REGEX).required();
      case 'year':
        return Joi.string().regex(regex.YEAR_REGEX).required();
      case 'account_id':
        return Joi.objectId();
      case 'origin_link':
        return Joi.string().regex(regex.LINK_REGEX).required();
    }
  };

  const schema = {};
  for (let item of fields) {
    schema[`${item}`] = getSchema(item);
  }
  return Joi.object(schema).validate(values);
};
