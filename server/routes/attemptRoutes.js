const router = require('express').Router();
const wrap = require('../middleware/asyncHandler');
const { protect } = require('../middleware/auth');
const attempts = require('../controllers/attemptController');

router.use(protect);

router.get('/', wrap(attempts.getHistory));
router.get('/:id', wrap(attempts.getResult));

module.exports = router;