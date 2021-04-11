const ora = require('ora')

module.exports = function (text, fn) {
  return async function (...args) {
    const spnnier = ora(text).start()
    const result = await fn(...args)
    spnnier.stop()
    return result
  }
}