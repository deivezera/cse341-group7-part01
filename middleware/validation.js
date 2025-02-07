const validator = require('../helpers/validator');

const saveShelter = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    location: 'required|string',
    owner: 'required|string',
    phone: 'string',
    email: 'required|string',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveDog = (req,res,next) => {
  const validationRule = {
    name: 'required|string',
    gender: 'required|string',
    age: 'required|int',
    breed: 'required|string',
    color: 'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
}

module.exports = {
  saveShelter,
  saveDog
};