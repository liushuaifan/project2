const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  createHr,
  getHr,
  updateHr
} = require('../handlers/hr');

module.exports = router;