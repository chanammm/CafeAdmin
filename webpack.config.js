var [path, HtmlWebpackPlugin, MiniCssExtractPlugin, optimizecssassets, uglifyjs, extractTextWebpackPlugin, fs, babel] = [
    require('path'), require('html-webpack-plugin'), require('mini-css-extract-plugin'), require('optimize-css-assets-webpack-plugin'), require('uglifyjs-webpack-plugin'),
    require('extract-text-webpack-plugin'), require('fs-extra'), require("babel-polyfill")
];

module.exports = {
    mode: 'development',  //模式 production development
    optimization: {
        minimizer: [
            new uglifyjs({
                cache: false
            }),
            new optimizecssassets()
        ]
    },
    entry: {
        configration: './src/public/javascripts/interactive/configuraction.js',  //配置文件
        login: './src/public/javascripts/interactive/login.js', //登陆操作
        index: './src/public/javascripts/interactive/index.js', //common 首页
        list: './src/public/javascripts/interactive/list.js', // 列表页
        statistics: './src/public/javascripts/interactive/statistics.js', // 统计
    },
    devServer: {
        port: 3000,
        progress: true,
        contentBase: './dist',
        compress: true
    },
    output: {
        filename: '[name]._23_aKvs-b8bW2Vg3fwHozO.js',
        path: path.resolve(__dirname, './src/dist/javascripts/')
    },
    watch: true,
    watchOptions: {
        poll: 1000,
        aggregateTimeout: 1000,
        ignored: /node_modules/
    },
    plugins: [
        new HtmlWebpackPlugin({  //login
            template: './src/views/login.html',
            filename: '../login.htm',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'login']
        }),
        new HtmlWebpackPlugin({  //common/index
            template: './src/views/index.html',
            filename: '../views/common/index.htm',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'index']
        }),
        new HtmlWebpackPlugin({  //app
            template: './src/views/app.html',
            filename: '../views/index.htm',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['']
        }),
        new HtmlWebpackPlugin({  //user
            template: './src/views/user.html',
            filename: '../views/user.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  //assets
            template: './src/views/assets.html',
            filename: '../views/assets.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  //client
            template: './src/views/client.html',
            filename: '../views/client.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  //machine
            template: './src/views/machine.html',
            filename: '../views/machine.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  //devicemanage
            template: './src/views/devicemanage.html',
            filename: '../views/devicemanage.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  //reference
            template: './src/views/reference.html',
            filename: '../views/reference.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  //admin
            template: './src/views/admin.html',
            filename: '../views/admin.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  //log
            template: './src/views/log.html',
            filename: '../views/log.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  //resources
            template: './src/views/resources.html',
            filename: '../views/resources.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  //repair
            template: './src/views/repair.html',
            filename: '../views/repair.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  //Pay Service
            template: './src/views/payservice.html',
            filename: '../views/payservice.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  //master
            template: './src/views/master.html',
            filename: '../views/master.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  //advertisement
            template: './src/views/advertisement.html',
            filename: '../views/advertisement.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  //loginlog
            template: './src/views/loginlog.html',
            filename: '../views/loginlog.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  //order
            template: './src/views/order.html',
            filename: '../views/order.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  //completeorder
            template: './src/views/completeorder.html',
            filename: '../views/completeorder.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  //underwayorder
            template: './src/views/underwayorder.html',
            filename: '../views/underwayorder.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  //cancelorder
            template: './src/views/cancelorder.html',
            filename: '../views/cancelorder.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  //statistics
            template: './src/views/statistics.html',
            filename: '../views/statistics.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'statistics']
        }),
        new MiniCssExtractPlugin({
            template: './src/public/stylesheets/base/style.min.css',
            filename: '../stylesheets/-b8bW2Vg3fwHozO.css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/, use: [
                    {
                        loader: 'style-loader',
                        options: {
                            insertAt: 'top'  //出现在顶部
                        }
                    },
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        esModule: false, // 这里设置为false
                        limit: 10 * 1024,
                        outputPath: '../images/'
                    }
                }
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src', 'img:data-src', 'audio:src'],
                        minimize: false
                    }
                }
            },
            {
                test: /\.pug$/,
                loader: ['html-loader', 'pug-html-loader']
            },
            {
                test: /\.mp3$/,
                use:{
                    loader: 'file-loader',
                    options: {
                        outputPath: '../../file/'
                    }
                }
            }
        ]
    }
}