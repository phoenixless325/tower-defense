const path = require('path');

module.exports = {
    target: 'web',
    mode: 'development',
    entry: path.resolve(__dirname, 'src', 'app.js'),
    output: {
        path: path.resolve(__dirname),
        filename: 'build.js'
    },
    module: {
        rules: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    }
};