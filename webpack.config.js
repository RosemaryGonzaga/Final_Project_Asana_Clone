
const path = require('path');

module.exports = {
    context: __dirname,
    entry: './frontend/asana.jsx',
    output: {
        path: path.join(__dirname, 'app', 'assets', 'javascripts'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '*']    // added '.css' for React DatePicker component
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                // test: /\.css$/, loader: "style-loader!css-loader",  // added this for React DatePicker component
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ['@babel/env', '@babel/react']
                    }
                },
            }
        ]
    },
    devtool: 'eval-source-map'
};