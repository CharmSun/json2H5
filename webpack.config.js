const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: "./src/index",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: '/dist/'
    },
    module: {
        rules: [
            { test: /\.ejs$/, loader: 'ejs-loader' }
        ]
    },
    devtool: "source-map",
    devServer: {
        hot: true,
        inline: true
    },
    plugins: [
        new webpack.ProvidePlugin({
            _: "underscore"
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};