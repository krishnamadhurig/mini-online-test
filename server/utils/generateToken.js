const jwt = require('jsonwebtoken');
const { TOKEN_EXPIRES_IN } = require('../config/constants');

module.exports = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });