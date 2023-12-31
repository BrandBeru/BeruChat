"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const config = {
    env: process.env.NODE_ENV || '',
    port: process.env.PORT || '',
    host: process.env.NODE_HOST || '',
    dbUser: process.env.DB_USER || '',
    dbPassword: process.env.DB_PASSWORD || '',
    dbName: process.env.DB_NAME || '',
    dbHost: process.env.DB_HOST || '',
    dbPort: process.env.DB_PORT || '',
    jwtSecret: process.env.JWT_SECRET || '',
    apiKey: process.env.API_KEY || '',
    clientId: process.env.CLIENT_ID || '',
    clientSecret: process.env.CLIENT_SECRET || '',
    callbackUrl: process.env.CALLBACK_URL || '',
    project: process.env.PROJECT || '',
    version: process.env.VERSION || '',
    encode_password: process.env.ENCODE_PASSWORD || '',
    encode_initial: process.env.ENCODE_INITIAL || '',
    encode_algorithm: process.env.ENCODE_ALGORITHM || '',
};
exports.default = config;
