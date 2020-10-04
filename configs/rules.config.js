const autoprefixer = require('autoprefixer')

const rules = [
    {
        exclude: /node_modules/,
        test: /\.(scss)$/,
        use: [
            'style-loader',
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    plugins: [
                        autoprefixer({
                            grid: "autoplace",
                        }),
                    ],
                },
            },
            'sass-loader',
        ],
    },
    // {
    //     test: /\.(js|jsx)$/,
    //     exclude: /node_modules/,
    //     use: {
    //         loader: "babel-loader",
    //         options: {
    //             presets: ['@babel/preset-env', '@babel/react'],
    //             plugins: [ require.resolve('babel-plugin-transform-react-jsx-filter') ]
    //         },
    //     }
    // },
    {
        test: /\.(js|jsx|ts|tsx)?$/,
        use: {
            loader: 'ts-loader',
            options: {
            configFile: 'tsconfig.webpack.json'
            }
        },
        exclude: /node_modules/
    },
    {
        test: /\.(png|svg|jpg|gif|ttf)$/,
        use: [
            {
                loader: 'url-loader',
                options:{
                    fallback: "file-loader",
                    name: "[name][md5:hash].[ext]",
                    outputPath: 'assets/',
                    publicPath: '/assets/'
                }
            }    
        ]
    },
]

module.exports = rules
