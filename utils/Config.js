/* eslint-disable no-undef */
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    env : process.env.NODE_ENV,
    MONGODB_URL:process.env.MONGODB_C_URL,
    secret: process.env.JWT_SECRET_KEY,
    expiresIn:process.env.JWT_EXPIRES_IN,
 
    jwt_refreash_secret : process.env.JWT_REFREASH_KEY,
    jwt_refreash_expiresin : process.env.JWT_REFREASH_EXPIRES_IN,

    salt_round: process.env.BCRYPT_SALT_ROUND,
}