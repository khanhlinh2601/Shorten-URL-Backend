const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);

const generateToken = async (payload, secretSignatue, tokenLife) => {
  try {
    return await sign(
      {
        payload,
      },
      secretSignatue,
      {
        algorithm: 'HS256',
        expiresIn: tokenLife,
      },
    );
  } catch (error) {
    console.log(`Error in generate access token: ${error}`);
    return null;
  }
};
const verifyToken = async (token, secretKey) => {
  try {
    return await verify(token, secretKey);
  } catch (error) {
    console.log(`Error in verify access token: ${error}`);
    return null;
  }
};
module.exports = {
  generateToken,
  verifyToken,
};
