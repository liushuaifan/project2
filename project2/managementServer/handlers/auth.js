const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signin = async function (req, res, next) {
  try {
    // finding a user
    const user = await db.Employee.findOne({
      email: req.body.email
    });
    const { id, firstName, lastName } = user;

    // checking if their password matches what was sent to the server
    const isMatch = await user.comparePassword(req.body.password);

    // if it all matches, log them in
    if (isMatch) {
      let token = jwt.sign(
        {
          id,
          firstName,
          lastName
        },
        process.env.JWT_SECRET_KEY
      );
      return res.status(200).json({
        id,
        firstName,
        lastName,
        token
      });
    } else {
      return next({
        status: 400,
        message: 'Invalid Email / Password.'
      });
    }
  } catch (err) {
    return next({
      status: 400,
      message: 'Invalid Email / Password.'
    });
  }
};

