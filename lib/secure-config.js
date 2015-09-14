var _ = require('lodash');

SecureConfig = function(key) {
  if (_.isNull(key) || _.isUndefined(key)) {
    key = "";
  }
  this.key = key;
}

SecureConfig.decrypt = function (config, key) {
  return (new SecureConfig(key)).decrypt(config);
}

SecureConfig.encrypt = function (config, key) {
  return (new SecureConfig(key)).encrypt(config);
}

SecureConfig.prototype.encrypt = function(config) {
  return {secure: this.key.encode(config)};
}

SecureConfig.prototype.decrypt = function(config, customizer) {
  var self = this;
  if (_.isString(config) || _.isBoolean(config) || _.isNull(config)) {
    return config;
  }
  var result;
  if (_.isArray(config)) {
    result = [];
  } else {
    result = {};
  }
  _.each(config, function (element, key) {
    result = self._process(result, key, self._decryptElement(key, element))
    if (_.isFunction(customizer)) {
      result = customizer.apply(self, result);
    }
  })
  return result
}

function isSecureKey(key) {
  return key === 'secure';
}
SecureConfig.isSecureKey = isSecureKey;

SecureConfig.prototype._decryptElement = function(key, element) {
  if (_.isArray(element) || _.isPlainObject(element)) {
    return this.decrypt(element);
  }
  if (isSecureKey(key) && element) {
    return this._decryptValue(element);
  }
  return element;
}

SecureConfig.prototype._process = function(result, key, value) {
  if (_.isArray(result)) {
    result.push(value);
    return result
  }
  if (_.isPlainObject(result) && !isSecureKey(key)) {
    result[key] = value;
    return result
  }
  return value;
}

SecureConfig.prototype._decryptValue = function(value) {
  var decoded = new Buffer(value, 'base64');
  if (this.key && _.isFunction(this.key.decrypt)) {
    try {
      return this.key.decrypt(decoded);
    } catch(ex) {
    }
  }
  console.error("Can not decrypt secure config value: "
    + value.toString().substring(0, 10) + " using key: "
    + this.key.toString().substring(0,10));
  return value;
}

module.exports = SecureConfig;
