const db = require('../models');
const jwt = require('jsonwebtoken');

exports.getEmployee = async function (req, res, next) {
  try {
    const employee = await db.Employee.findById(req.params.employee_id);
    return res.status(200).json(employee);
  }catch (err) {
    return next(err);
  }
};

exports.updateEmployee = async function (req, res, next) {
    try {
        const employee = await db.Employee.findByIdAndUpdate(req.params.employee_id, req.body);
        await employee.save();
        return res.status(200).json(employee);
      } catch (err) {
        return next(err);
      }
  };

exports.createEmployee = async function (req, res, next) {
  try {
    console.log(db.Employee)
    let user = await db.Employee.create(req.body);
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