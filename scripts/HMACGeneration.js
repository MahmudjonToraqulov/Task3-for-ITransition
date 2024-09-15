const crypto = require('crypto')

class HMACGeneration {
  static generateHMAC(key, message) {
    return crypto.createHmac('sha256', key).update(message).digest('hex')
  }
}

module.exports = HMACGeneration