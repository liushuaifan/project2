const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
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
    default:""
  },
  birthday: {
    type: Date,
    default:""
  },
  gender: {
    type: String,
    default:""
  },
  address: {
    type: String,
    default:""
  },
  cellPhone: {
    type: Number,
  },
  workPhone: {
    type: Number,
  },
  visaTitle: {
    type: String,
    default:""
  },
  visaStatus: {
    type: String,
  },
  visaStartDate: {
    type: Number,
  },
  visaEndDate: {
    type: Number,
  },
  emergencyFirstName:{
    type:String,
    default:""
  },
  emergencyLastName:{
    type:String,
    default:""
  },
  emergencyRelationship:{
    type:String,
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
  ],
  visaDocumentFeedback: [
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

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;