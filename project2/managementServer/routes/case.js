const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  //在hr make action and feedback
  createCase,
  //在employeeStatus fetch， 根据employee object的id
  getCase,
  //在employee upload 上传新的文件
  deleteCase
} = require('../handlers/hr');

module.exports = router;