const path = require('path');
const yaml = require('yamljs');
const json5 = require('json5');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const JsonMinimizerPlugin = require('json-minimizer-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'production',
  devtool: false,
  entry: './src/main.tsx',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
    extensions: ['.tsx', '.ts', '.js', '.json', '.scss'],
  },
  output: {
    clean: true, // Clean the output directory before emit.
    filename: 'js/[name].[contenthash:8].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
      new CssMinimizerPlugin(),
      new JsonMinimizerPlugin(),
      new HtmlMinimizerPlugin(),
      // 打包分析
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled', // 禁用打包分析，默认 server, 测试完成改回 disabled
        openAnalyzer: false, // 是否自动弹出窗口，默认 true， 测试完成改回 false
      }),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        babel: {
          minChunks: 1,
          name: 'babel-runtime-chunk',
          test: /@babel\/runtime/,
          priority: 97,
        },
        reactH5AudioPlayer: {
          minChunks: 1,
          name: 'react-h5-audio-player-chunk',
          test: /react-h5-audio-player/,
          priority: 96,
        },
        radixUi: {
          minChunks: 1,
          name: 'radix-ui-chunk',
          test: /@radix-ui/,
          priority: 95,
        },
        reactVirtuoso: {
          minChunks: 1,
          name: 'react-virtuoso-chunk',
          test: /react-virtuoso/,
          priority: 94,
        },
        reactHookForm: {
          minChunks: 1,
          name: 'react-hook-form-chunk',
          test: /react-hook-form/,
          priority: 93,
        },
        reactRouter: {
          minChunks: 1,
          name: 'react-router-chunk',
          test: /react-router/,
          priority: 92,
        },
        zod: {
          minChunks: 1,
          name: 'zod-chunk',
          test: /zod/,
          priority: 91,
        },
        redux: {
          minChunks: 1,
          name: 'redux-toolkit-chunk',
          test: /redux-toolkit/,
          priority: 90,
        },
        remixRun: {
          minChunks: 1,
          name: 'remix-run-chunk',
          test: /@remix-run/,
          priority: 89,
        },
        tailwind: {
          minChunks: 1,
          name: 'tailwind-chunk',
          test: /tailwind/,
          priority: 88,
        },
        reactDom: {
          name: 'react-dom-chunk',
          test: /react-dom/,
          priority: 87,
        },
        ahooks: {
          minChunks: 1,
          name: 'ahooks-chunk',
          test: /ahooks/,
          priority: 70,
        },
        axios: {
          minChunks: 1,
          name: 'axios-chunk',
          test: /axios/,
          priority: 50,
        },
      },
    },
  },
  plugins: [
    // 清理输出内容，自动根据output的内容来清理。
    new CleanWebpackPlugin(),
    new CopyPlugin({
      // 把public目录下的文件移动到打包目录下的public
      patterns: [{ from: 'public', to: 'public' }],
    }),
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      publicPath: '/',
      template: 'index.html',
      icon: '/public/stars.svg',
      filename: 'index.html',
    }),
    new CompressionPlugin({
      filename: '[path][base].gz[query]', // 生成资源的名字 [path].gz[query] 是默认名字
      algorithm: 'gzip', //  // 压缩算法
      test: /\.(js|css|html|svg)$/, // 匹配的资源
      compressionOptions: { level: 8 }, // 压缩等级 默认9级
      minRatio: 0.8, //只有压缩率比这个值小的资源才会被处理
      threshold: 5120, //对超过5k的数据压缩
      deleteOriginalAssets: false, //不删除源文件
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              // 只进行语法转换,不进行类型校验,提高构建速度
              // 类型检查交给 fork-ts-checker-webpack-plugin 在别的的线程中做
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(css|s[ac]ss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext][query]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext][query]',
        },
      },
      {
        test: /\.yaml$/i,
        type: 'json',
        parser: {
          parse: yaml.parse,
        },
        generator: {
          filename: 'files/[name][ext][query]',
        },
      },
      {
        test: /\.json5?$/i,
        type: 'json',
        parser: {
          parse: json5.parse,
        },
        generator: {
          filename: 'files/[name][ext][query]',
        },
      },
    ],
  },
};
