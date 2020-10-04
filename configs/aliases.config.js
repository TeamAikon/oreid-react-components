const path = require('path')

// __dirname gives exact path where the file is, in this case: PROJECT/configs. It is needed to add ../ at the beginning of the aliases to solve correct path.

const aliases = {
    'oreid-login-button': path.resolve(__dirname, '../packages/LoginButton/src/index'),
};

module.exports = { aliases }
