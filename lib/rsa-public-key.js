var crypto = require('crypto');

RSAPublicKey = function(publicKey, name) {
  this.key = publicKey;
  this.name = name || '[SECRET]';
}

RSAPublicKey.prototype.encode = function(str) {
  if (!Buffer.isBuffer(str)) {
    str = new Buffer(str);
  }
  var b = this.encrypt(str);
  return b.toString('base64');
};

RSAPublicKey.prototype.encrypt = function(buffer) {
  return crypto.publicEncrypt(this.key, buffer);
};

RSAPublicKey.prototype.toString = function() {
  return this.name.toString();
}


module.exports = RSAPublicKey
