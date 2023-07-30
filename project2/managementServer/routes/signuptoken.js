const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  createtoken


} = require('../handlers/token');

router.post('/createtoken', createtoken);


module.exports = router;