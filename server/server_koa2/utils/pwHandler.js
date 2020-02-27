const crypto = require('crypto');
let hmac = crypto.createHmac('sha256', 'movies');

module.exports = function generatePw(pw) {
  const hmac = crypto.createHmac('sha256', 'movies');
  return hmac.update(pw).digest('hex');
};
