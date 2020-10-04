const pkg = require('./package.json');
const rules = require('./configs/rules.config');
const { aliases } = require('./configs/aliases.config');

module.exports = {
    module: {
        rules: rules,
    },
    entry: './src/index.js',
    output: {
        filename: pkg.main,
        library: '',
        libraryTarget: 'commonjs'
    },
    resolve: {
        alias: aliases,
        extensions: ['.js', '.jsx', '.json', '.ttf', '.png', '.jpg', '.json' ],
        modules: ['node_modules']
    },
};

// const webpack = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const path = require('path');
// const libraryName= pkg.name;
// module.exports = {
//     mode: 'production',
//     entry: "./src/index.js",
//     output: {
//         filename: pkg.main,
//         library: '',
//         libraryTarget: 'commonjs'
//     },
//     plugins: [
//         new ExtractTextPlugin({
//             filename: 'oreidLoginButton.css',
//         }),
//     ],
//     node: {
//       net: 'empty',
//       tls: 'empty',
//       dns: 'empty'
//     },
//     module: {
//         rules : [
//             ...rules,
//             {
//             test: /\.(png|svg|jpg|gif|ttf)$/,
//             use: [
//                 {
//                     loader: 'url-loader',
//                     options:{
//                         fallback: "file-loader",
//                         name: "[name][md5:hash].[ext]",
//                         outputPath: 'assets/',
//                         publicPath: '/assets/'
//                     }
//                 }    
//             ]
//         },
//         {
//             test: /\.*css$/,
//             use : ExtractTextPlugin.extract({
//                 fallback : 'style-loader',
//                 use : [
//                     'css-loader',
//                     'sass-loader'
//                 ]
//             })
//         },
//         {
//             test: /\.(eot|ttf|woff|woff2)$/,
//             use: ["file-loader"],
//         },
//         {
//             test: /\.(pdf|doc|zip)$/,
//             use: ["file-loader"],
//         }]
//     },
//     resolve: { 
//         alias: { 
//             // 'react': path.resolve(__dirname, './node_modules/react') ,
//             // 'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
//             // 'assets': path.resolve(__dirname, './src/assets'),
//             ...aliases
//         } 
//     },
//     externals: {
//         // Don't bundle react or react-dom
//         react: {
//             commonjs: "react",
//             commonjs2: "react",
//             amd: "React",
//             root: "React"
//         },
//         "react-dom": {
//             commonjs: "react-dom",
//             commonjs2: "react-dom",
//             amd: "ReactDOM",
//             root: "ReactDOM"
//         }
//     }
// };