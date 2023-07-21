const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const employee = require('./employee');

const visaCaseSchema = new mongoose.Schema({
  employee: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employee'
    },
  hr: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'hr'
    },
  hrAction: {
    type: String,
    required: true
  },
  hrFeedback: {
    type: String,
    required: true
  },

});

visaCaseSchema.pre('save', async function (next) {
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

visaCaseSchema.methods.comparePassword = async function (candidatePassword, next) {
  try {
    let isMatched = await bcrypt.compare(candidatePassword, this.password);
    return isMatched;
  } catch (err) {
    return next(err);
  }
};

const visaCase = mongoose.model('visaCase', visaCaseSchema);

module.exports = visaCase;