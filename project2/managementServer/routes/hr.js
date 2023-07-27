const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  createHr,
  getHr,
  updateHr
} = require('../handlers/hr');

router.post('/hrSignup', createHr);
router.get('/:hr_id', getHr);
router.put('/:hr_id', updateHr);

module.exports = router;