const router = require('express').Router();
const wrap = require('../middleware/asyncHandler');
const { protect, adminOnly } = require('../middleware/auth');
const questions = require('../controllers/questionController');

router.use(protect, adminOnly);

router.get('/', wrap(questions.list));
router.post('/', wrap(questions.create));
router.delete('/:id', wrap(questions.remove));

module.exports = router;