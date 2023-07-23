const db = require('../models');
const jwt = require('jsonwebtoken');

// GET - /api/employee/:employee_id
exports.getEmployee = async function (req, res, next) {
  try {
    const employee = await db.Employee.findById(req.params.employee_id);
    return res.status(200).json(employee);
  }catch (err) {
    return next(err);
  }
};

// PUT - /api/employee/:employee_id
exports.updateEmployee = async function (req, res, next) {
    try {

      const employee = await db.Employee.findById(req.params.employee_id);
      let index=-1;
      for(let key in req.body){
        if(req.body.hasOwnProperty(key)){         
          if (key === 'visaDocumentName' || key === 'visaDocumentLink' || key === 'visaDocumentStatus') {
            if(key === 'visaDocumentName' && req.body[key]==='Receipt'){
              index=0;
            }else if(key === 'visaDocumentName' && req.body[key]==='EAD'){
              index=1;
            }
            console.log("index is", index);
            employee[key][index] = req.body[key];
            console.log(employee[key]);
          }else{
            employee[key] = req.body[key];
          }
        }
      }
        // const employee = await db.Employee.findByIdAndUpdate(req.params.employee_id, req.body);
        await employee.save();
        return res.status(200).json(employee);
      } catch (err) {
        return next(err);
      }
  };

  // PUT - /api/employee/clean/:employee_id
exports.cleanEmployee = async function (req, res, next) {
  try {
    const employee = await db.Employee.findByIdAndUpdate(req.params.employee_id, req.body);
    await employee.save();
    return res.status(200).json(employee);
  } catch (err) {
    return next(err);
  }
}

// POST - /api/employee/employeeSignup
exports.createEmployee = async function (req, res, next) {
  try {
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