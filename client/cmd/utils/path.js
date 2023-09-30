const { normalize, dirname } = require('client/cmd/utils/path')

exports.getDevFolder = (path) => {
  const [nodeModules, devFolder] = normalize(dirname(path)).split(/\/|\\/g)

  return [nodeModules, devFolder].join('/')
}
