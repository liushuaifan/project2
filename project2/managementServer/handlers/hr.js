const db = require('../models');
const jwt = require('jsonwebtoken');

exports.getHr = async function (req, res, next) {
  try {
    const employee = await db.Hr.findById(req.params.hr_id);
    return res.status(200).json(employee);
  }catch (err) {
    return next(err);
  }
};

exports.updateHr = async function (req, res, next) {
    try {
        const employee = await db.Hr.findByIdAndUpdate(req.params.hr_id, req.body);
        await employee.save();
        return res.status(200).json(employee);
      } catch (err) {
        return next(err);
      }
};

exports.createHr = async function (req, res, next) {
  try {

    let user = await db.Hr.create(req.body);
    let { id,email,password } = user;
    return res.status(200).json({
      id,
      email,
      password
    });
  } catch (err) {
    // see what kind of error
    // if it is a certain error
    // responde with username/email already taken
    // otherwise just send back with 400

    // if there is already a user with that email
    if (err.code === 11000) {
      err.message = 'Sorry, that username and/or email is taken';
    }
    return next({
      status: 400,
      message: err.message
    });
  }
};