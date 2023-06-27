const crypto = require('crypto');

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex'); // Generates a 32-byte (256-bit) key
};

module.exports = {
  generateSecretKey
};
