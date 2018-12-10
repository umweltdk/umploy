var crypto = require('crypto');

RSAPrivateKey = function(privateKey, name) {
  this.key = privateKey;
  this.name = name || '[SECRET]';
}

RSAPrivateKey.prototype.encode = function(str) {
  if (!Buffer.isBuffer(str)) {
    str = Buffer.from(str);
  }
  var b = this.encrypt(str);
  return b.toString('base64');
};

RSAPrivateKey.prototype.encrypt = function(buffer) {
  return crypto.publicEncrypt(this.key, buffer);
};

RSAPrivateKey.prototype.decrypt = function(buffer) {
  return crypto.privateDecrypt(this.key, buffer);
};

RSAPrivateKey.prototype.toString = function() {
  return this.name.toString();
}

module.exports = RSAPrivateKey
