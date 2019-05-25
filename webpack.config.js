const path = require("path");

module.exports = {
    entry: "./src/main.js",
    output: {
        filename: "CreateLyricMarker.jsx",
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.(js|ts)$/,
            loader: "babel-loader",
            options: {
                configFile: path.resolve('babel.config.js')
            },
            include: [
                path.resolve("src"),
                path.resolve("node_modules/fast-sax")
            ]
        }]
    }
}