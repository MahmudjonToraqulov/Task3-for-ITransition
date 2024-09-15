const crypto = require('crypto')

class KeyGeneration {
  static generateKey(length = 32) {
    return crypto.randomBytes(length)
  }
}

module.exports = KeyGeneration