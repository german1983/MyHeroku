require('webpack');

module.exports = {
    stats: {
        // Configure the console output
        errorDetails: true, //this does show errors
        colors: false,
        modules: true,
        reasons: true
    },
    context: __dirname + '/src',
    entry: {
        javascript: __dirname + '/public/react/js/index.jsx',
    },
    output: {
        filename: 'home.js',
        path: __dirname + '/public/react/dist'
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel-loader?presets[]=react,presets[]=es2015'],
            },
            {
                test: /\.html$/,
                loader: "file?name=[name].[ext]"
            }
        ]
    }
};