const router = require('express').Router();
const wrap = require('../middleware/asyncHandler');
const { protect } = require('../middleware/auth');
const test = require('../controllers/testController');

router.use(protect);

router.post('/start', wrap(test.startTest));
router.post('/:id/submit', wrap(test.submitTest));

module.exports = router;