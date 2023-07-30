const db = require('../models');
const jwt = require('jsonwebtoken');





exports.createtoken = async function (req, res, next) {
  try {

    let user = await db.Token.create(req.body);
    let { id,email,name,link, status } = user;
    return res.status(200).json({
      id,
      email,
      name,link, status
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