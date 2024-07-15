const { Buffer } = require('buffer');

export const encrypt = (str) => Buffer.from(str).toString('base64');

export const decrypt = (str) => Buffer.from(str, 'base64').toString('utf8');