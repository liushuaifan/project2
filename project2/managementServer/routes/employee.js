const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  createEmployee,
  getEmployee,
  updateEmployee
} = require('../handlers/employee');

module.exports = router;