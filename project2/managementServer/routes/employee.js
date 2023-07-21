const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  createEmployee,
  getEmployee,
  updateEmployee
} = require('../handlers/employee');


router.post('/employeeSignup', createEmployee);
router.get('/:employee_id', getEmployee);
router.put('/:employee_id', updateEmployee);


module.exports = router;