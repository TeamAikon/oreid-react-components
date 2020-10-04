const rules = require('../configs/rules.config')
const { aliases } = require('../configs/aliases.config')

module.exports = ({ config }) => {
    config.module.rules = rules
    config.resolve.alias = aliases;
    config.resolve.extensions.push(".ts", ".tsx")
    return config;
}
