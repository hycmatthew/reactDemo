const path = require('path');

module.exports = {
    //entry: './containers/Main.jsx',
    output: {
        path:  path.resolve(__dirname, '/dist'),
        filename: 'index.bundle.js'
    },
    devServer:{
        port: 3010,
        watchContentBase: true,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    }
};