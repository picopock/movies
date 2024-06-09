import crypto from 'crypto';

const hmac = crypto.createHmac('sha256', 'movies');

export const generatePw = (pw) => {
  const hmac = crypto.createHmac('sha256', 'movies');
  return hmac.update(pw).digest('hex');
}