// const pkg = require('./package.json');
// const rules = require('./configs/rules.config');
// const { aliases } = require('./configs/aliases.config');

// module.exports = {
//     module: {
//         rules: rules,
//     },
//     entry: './src/index.js',
//     output: {
//         filename: pkg.main,
//         library: '',
//         libraryTarget: 'commonjs'
//     },
//     resolve: {
//         alias: aliases,
//         extensions: ['.tsx', '.ts', '.js', '.jsx', '.json', '.ttf', '.png', '.jpg', '.json' ],
//         modules: ['node_modules']
//     },
// };

const pkg = require('./package.json');
const rules = require('./configs/rules.config');
const { aliases } = require('./configs/aliases.config');
const path = require('path');

const commonConfig = {
  mode: 'production',
  // entry: {
  //   'eos-transit': './src/index.ts',
  //   'eos-transit-scatter': './src/walletProviders/scatter/index.ts',
  //   'eos-transit-stub': './src/walletProviders/stub.ts'.
  // },
  module: {
      rules: rules,
  },
  entry: {
    app: ['./src/index.js'],
    vendor: ['react', 'react-dom']
},
  output: {
      filename: pkg.main,
      // library: '',
      path: path.resolve(__dirname, 'umd'),
      libraryTarget: 'umd',
      library: ['providers', 'LoginButton'],
      libraryExport: 'default'
  },
  resolve: {
      alias: aliases,
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.json', '.ttf', '.png', '.jpg', '.json' ],
      modules: ['node_modules']
  },
  plugins: [
    // new ProvidePlugin({
    //   'window.ScatterJS': ['scatterjs-core', 'default'],
    //   'window.ScatterEOS': ['scatterjs-plugin-eosjs2', 'default']
    // })
  ],
  externals: {
    // 'scatterjs-core': 'ScatterJS',
    // 'scatterjs-plugin-eosjs2': 'ScatterEOS'
  },
  stats: {
    colors: true
  }
};

const providersConfig = {
  ...commonConfig,
  entry: {
    // scatter: './src/walletProviders/scatter/index.ts',
    loginButton: './packages/LoginButton/src/index.ts'
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: ['providers', '[name]'],
    libraryExport: 'default',
    globalObject: 'window'
  }
};

export default [providersConfig];
