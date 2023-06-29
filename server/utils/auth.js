const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET_JWT_KEY;
const expiration = '1h';

module.exports = {
  signToken: function({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  }
};