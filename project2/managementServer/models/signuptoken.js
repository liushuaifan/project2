const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const tokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  link:{
    type: String,
    required: true
  },
  status:{
    type: Boolean
  }
});

tokenSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});



const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;