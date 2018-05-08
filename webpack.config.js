const webpack = require('webpack');
const path = require('path');

module.exports = function(env, argv) {
    const config = {
        entry: "./src/index",
        output: {
            path: path.resolve(__dirname, "public/js"),
            filename: "bundle.js",
            publicPath: '/public/js'
        },
        module: {
            rules: [
                { test: /\.ejs$/, loader: 'ejs-loader' }
            ]
        },
        devtool: argv.mode === "production" ? false : "source-map",
        devServer: {
            hot: true,
            inline: true,
            proxy: {
                "/img/public": "http://localhost:8080/public"
            }
        },
        plugins: [
            new webpack.ProvidePlugin({
                _: "lodash"
            })
        ]
    };
    argv.mode === "development" && config.plugins.push(new webpack.HotModuleReplacementPlugin());
    return config;
};
