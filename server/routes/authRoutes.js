const router = require('express').Router();
const wrap = require('../middleware/asyncHandler');
const { protect } = require('../middleware/auth');
const auth = require('../controllers/authController');

router.post('/signup', wrap(auth.signup));
router.post('/login', wrap(auth.login));
router.get('/me', protect, auth.me);

module.exports = router;