const path = require('path');

module.exports = {
    entry: './src/index.js', /* start from here*/
    output: { 
        path: path.resolve('public'), /* in public bundle js to bundle.js*/
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/, /* all js file*/
                exclude: /node_modules/, /* exclude files in mode_modules*/
                use: {
                    loader: 'babel-loader'
                },
            },
        ],
    },
};