const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = function (_, arg) {
    const config = {
        context: path.resolve(__dirname, 'src'),
        entry: {
            index: [path.join(__dirname, "./src/index.js")]
        },
        output: {
            filename: "bundle.js",
            path: path.resolve(__dirname, "./dist/"),

        },
        devtool: "source-map",
        devServer: {
            //js bundle位置
            contentBase: path.resolve(__dirname, "./dist"),
            port: 8000,
            host: 'localhost',
            hot: true,
            open: true
        },
        resolve: {
            extensions: ["config.js", ".ts", ".tsx", ".js", ".json"]
        },
        module: {
            rules: [
                {
                    exclude: /node_modules/,
                    test: /\.js?$/,
                    loader: "babel-loader"
                },
                {
                    test: /\.less$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: ['css-loader?modules&localIdentName=[local]-[hash:base64:5]', 'postcss-loader', 'less-loader']
                    })
                }, {
                    test: /\.(png|jpg|gif)$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }]
                }
            ]
        },
        // When importing a module whose path matches one of the following, just
        // assume a corresponding global variable exists and use that instead.
        // This is important because it allows us to avoid bundling all of our
        // dependencies, which allows browsers to cache those libraries between builds.
        externals: [],
        plugins: [
            // 想出多个页面就 new 多个htmlWebpackPlugin 及对应的文件位置 配置chunks确定引入什么模块
            new webpack.DefinePlugin({
                "process.env.NODE_ENV": JSON.stringify(arg.mode || "production")
            }),
            new htmlWebpackPlugin({
                template: path.join(__dirname, "./public/index.html"),
                chunks: ['index', 'vendor', 'common'],  //打包什么东西
                favicon: path.join(__dirname, "./public/assets/favicon.ico"),
                mode: arg.mode
            }),

            new ExtractTextPlugin({
                filename: '[name]/[name].[hash:8].css'
            }),
            new CleanWebpackPlugin(['bundle']),
            new webpack.HotModuleReplacementPlugin()
        ],
        resolve: {
            modules: [
                path.resolve(__dirname, "/src"),
                path.resolve(__dirname, "node_modules/")
            ],
            extensions: [".js", ".scss", ".css"]
        },
        node: {
            process: false,
            global: false,
            fs: "empty"
        }
    }
    return config;
};
