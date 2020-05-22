'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin 
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length }); 

let plugins = [];
for (let key in config.projects) {
  plugins.push(
    new HtmlWebpackPlugin({
      filename: key + ".html",
      template: config.projects[key].template,
      theme: config.build.THEME_ENV,
      chunks: [key, 'manifest','vendor'],
      inject: true,
      config: config.projects[key].config
    })
  );
}

const env = require('../config/prod.env') 
const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: false,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath("js/[name].[chunkhash].js"),
    chunkFilename: utils.assetsPath("js/[id].[chunkhash].js")
  },
  plugins: [
    new HappyPack({
      //用id来标识 happypack处理那里类文件
      id: 'happyBabel',
      //如何处理  用法和loader 的配置一样
      loaders: [{
        loader: 'babel-loader?cacheDirectory=true',
      }],
      //共享进程池
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: true,
    }),
    // new webpack.DllReferencePlugin({
    //   context: path.resolve(__dirname, '..'),
    //   manifest: require('./vendor-manifest.json')
    // }),
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      "process.env": env
      
    }),
    // new UglifyJsPlugin({
    //   uglifyOptions: {
    //     compress: {
    //       warnings: false
    //     }
    //   },
    //   sourceMap: config.build.productionSourceMap,
    //   parallel: true
    // }),
    new ParallelUglifyPlugin({
      // cacheDir: '.cache/',
      uglifyJS:{
        output: {
          beautify: false,
          comments: false
        }, 
        compress: {
          /* 是否在UglifyJS删除没有用到的代码时输出警告信息，默认为输出，可以设置为false关闭这些作用不大的警告 */
          // warnings: false, 
          /* 是否删除代码中所有的console语句，默认为不删除，开启后，会删除所有的console语句 */
          drop_console: false, 
          /* 是否内嵌虽然已经定义了，但是只用到一次的变量，比如将 var x = 1; y = x, 转换成 y = 5, 默认为不
           转换，为了达到更好的压缩效果，可以设置为false */
          collapse_vars: true, 
          /* 是否提取出现了多次但是没有定义成变量去引用的静态值，比如将 x = 'xxx'; y = 'xxx'  转换成
            var a = 'xxxx'; x = a; y = a; 默认为不转换，为了达到更好的压缩效果，可以设置为false */
          reduce_vars: true
        },  
        warnings: false, 
        sourceMap: false//config.build.productionSourceMap,
      }
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath("css/[name].[contenthash].css"),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: false
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      NODE_ENV: process.env.NODE_ENV,
      filename: config.build.index,
      template: "index.html",
      inject: true,
      chunks: ["app", "manifest", "vendor"],
      theme: config.build.THEME_ENV,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: "dependency"
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks(module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(path.join(__dirname, "../node_modules")) === 0
        );
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: "app",
      async: "vendor-async",
      children: true,
      minChunks: 3
    }),

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../static"),
        to: config.build.assetsSubDirectory,
        ignore: [".*"]
      }
    ],
    new ImageminPlugin({ 
      test: /\.(jpe?g|png|gif|svg)$/i,
      pngquant: {
        quality: '65'
      }
    })),
    
    // new BundleAnalyzerPlugin({
    //   //  可以是`server`，`static`或`disabled`。
    //   //  在`server`模式下，分析器将启动HTTP服务器来显示软件包报告。
    //   //  在“静态”模式下，会生成带有报告的单个HTML文件。
    //   //  在`disabled`模式下，你可以使用这个插件来将`generateStatsFile`设置为`true`来生成Webpack Stats JSON文件。
    //   analyzerMode: 'server',
    //   //  将在“服务器”模式下使用的主机启动HTTP服务器。
    //   analyzerHost: '127.0.0.1',
    //   //  将在“服务器”模式下使用的端口启动HTTP服务器。
    //   analyzerPort: 8888, 
    //   //  路径捆绑，将在`static`模式下生成的报告文件。
    //   //  相对于捆绑输出目录。
    //   reportFilename: 'report.html',
    //   //  模块大小默认显示在报告中。
    //   //  应该是`stat`，`parsed`或者`gzip`中的一个。
    //   //  有关更多信息，请参见“定义”一节。
    //   defaultSizes: 'parsed',
    //   //  在默认浏览器中自动打开报告
    //   openAnalyzer: true,
    //   //  如果为true，则Webpack Stats JSON文件将在bundle输出目录中生成
    //   generateStatsFile: false, 
    //   //  如果`generateStatsFile`为`true`，将会生成Webpack Stats JSON文件的名字。
    //   //  相对于捆绑输出目录。
    //   statsFilename: 'stats.json',
    //   //  stats.toJson（）方法的选项。
    //   //  例如，您可以使用`source：false`选项排除统计文件中模块的来源。
    //   //  在这里查看更多选项：https：  //github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
    //   statsOptions: null,
    //   logLevel: 'info' // 日志级别。可以是'信息'，'警告'，'错误'或'沉默'。
    // }),
  ].concat(...plugins)
});

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
