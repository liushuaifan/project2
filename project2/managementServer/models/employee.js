const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    unique:true
  },
  lastName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  preferedName: {
    type: String,
  },
  profileImg: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  ssn: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  cellPhone: {
    type: Number,
    required: true,
  },
  workPhone: {
    type: Number,
  },
  visaTitle: {
    type: String,
    required: true,
  },
  visaStatus: {
    type: String,
    required: true,
  },
  visaStartDate: {
    type: Number,
    required: true,
  },
  visaEndDate: {
    type: Number,
    required: true,
  },
  emergency:{
    type:String,
    required: true,
  },
  license:{
      type: String,
  },
  visaDocumentName: [
    {
      type: String,
    }
  ],
  visaDocumentLink: [
    {
      type: String,
    }
  ],
  visaDocumentStatus: [
    {
      type: String,
    }
  ]
});

employeeSchema.pre('save', async function (next) {
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

employeeSchema.methods.comparePassword = async function (candidatePassword, next) {
  try {
    let isMatched = await bcrypt.compare(candidatePassword, this.password);
    return isMatched;
  } catch (err) {
    return next(err);
  }
};

const employee = mongoose.model('employee', employeeSchema);

module.exports = employee;