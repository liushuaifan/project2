const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  createEmployee,
  getEmployee,
  updateEmployee,
  cleanEmployee
} = require('../handlers/employee');


router.post('/employeeSignup', createEmployee);
router.get('/:employee_id', getEmployee);
router.put('/:employee_id', updateEmployee);
router.put('/clean/:employee_id', cleanEmployee);


module.exports = router;