const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// plugins
const webpackPlugins = [
    new HtmlWebpackPlugin({
        inject: true,
        template: './src/index.html'
    }) 
];

// analyze ?
const shouldAnalyze = process.argv.includes('--analyze');
if(shouldAnalyze) webpackPlugins.push(new BundleAnalyzer({ analyzerPort: 2001 }));

// common config
module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions: ['.js','.ts']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.png$/,
                type: 'asset/resource'
            }
        ]
    },
    plugins: webpackPlugins
}