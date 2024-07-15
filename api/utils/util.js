const crypto = require('crypto');


module.exports.hashPassword = (password) => crypto.createHash('sha256').update(password).digest('hex')
