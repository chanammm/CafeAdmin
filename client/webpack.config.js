var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin'); 
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var [optimizecssassets,uglifyjs] = [require('optimize-css-assets-webpack-plugin'),require('uglifyjs-webpack-plugin')]

module.exports = {
    optimization:{  
        minimizer:[
            new uglifyjs({
                cache: false
            }),
            new optimizecssassets()
        ]
    },
    mode:'development', //development  //production
    entry:{
        index:'./templates/javascripts/index.js'
    },
    devServer:{
        port: 888,
        progress: true,  //进度
        contentBase: './templates/build',
        compress: true
    },
    watch: true,
    watchOptions: {
        poll: 1000,
        aggregateTimeout: 1000,
        ignored: /node_modules/
    },
    output:{
        filename:'[name]_23_aKvs-b8bW2Vg3fwHozO.js',
        path: path.resolve(__dirname, './templates/build/javascripts/')
    },
    plugins:[
        new MiniCssExtractPlugin({
            template: './templates/stylesheets/style.min.css',
            filename: '../stylesheets/_23_aKvs-b8bW2Vg3fwHozO.css'
        }),
        new HtmlWebpackPlugin({
            template: './templates/views/index.pug', 
            filename: '../index.html',
            minify:{
                removeAttributeQuotes: true,  //去除 双引号
                collapseWhitespace: true   //加密
            },
            hash: true, //引入文件后面加哈希值
            chunks: ['index']
        })
    ],
    module:{
        rules:[
            {
                test: /\.css$/, use: [
                    {
                        loader: 'style-loader',
                        options:{
                            insertAt: 'top'  //出现在顶部
                        }
                    },
                    MiniCssExtractPlugin.loader, 
                    'css-loader'
                ]
            },
            {
                test: /\.js$/, use:{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use:{
                    loader: 'url-loader',
                    options:{
                        limit: 10 * 1024,
                        outputPath: '../images/'
                    }
                }
            },
            {
                test: /\.pug$/, 
                loader: ['raw-loader', 'pug-html-loader']
            }
        ]
    }
}