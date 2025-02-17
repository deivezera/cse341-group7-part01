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
    age: 'required|integer',
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
};

const saveRequest = (req,res,next) => {
  const validationRule = {
    requestDate: 'required|string',
    visitScheduled: 'required|string',
    name: 'required|string',
    gender: 'required|string',
    age: 'required|integer',
    occupation: 'string',
    address: 'required|string',
    dogsAtHome: 'integer',
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

const saveOwner = (req,res,next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    age: 'required|integer',
    occupation: 'string',
    address: 'required|string',
    adoptionDate: 'required|string',
    dogAdopted: 'required|string',
    dogsAtHome: 'integer' ,
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
  saveDog,
  saveOwner,
  saveRequest
};