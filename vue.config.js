/* eslint-disable @typescript-eslint/no-var-requires */
// const bodyParser = require('body-parser')
// const mockServer = require('./mock/mock/server');
const { NODE_ENV, VUE_APP_PORT, VUE_APP_MOCK } = process.env;
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    transpileDependencies: true,
    publicPath: '/',
    outputDir: 'dist',
    productionSourceMap: false,
    lintOnSave: false, // 关闭eslist
    //配置入口文件和title
    pages: {
        index: {
            // page 的入口
            entry: 'src/main.ts',
            // // 模板来源
            // template: 'public/index.html',
            // 在 dist/index.html 的输出
            // filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'MetaRent',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            // chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        // 当使用只有入口的字符串格式时，
        // 模板会被推导为 `public/subpage.html`
        // 并且如果找不到的话，就回退到 `public/index.html`。
        // 输出文件名会被推导为 `subpage.html`。
        // subpage: 'src/subpage/main.js'
    },
    devServer: {
        port: VUE_APP_PORT || 9000,
        // 配置反向代理
        /*
        proxy: {
            '/api': {
              target: '<url>',
              ws: true,
              changeOrigin: true
            },
            '/foo': {
              target: '<other_url>'
            }
        },
        */
        // setupMiddlewares: function (middlewares, devServer) {
        //     if (NODE_ENV === 'development' && VUE_APP_MOCK === 'true') {
        //         // parse app.body
        //         // https://webpack.docschina.org/configuration/dev-server#devserversetupmiddlewares
        //         // create application/json parser
        //         devServer.app.use(bodyParser.json());
        //         // create application/x-www-form-urlencoded parser
        //         devServer.app.use(bodyParser.urlencoded({ extended: false }));
        //         mockServer(devServer.app);
        //         return middlewares
        //     }
        // }
    },
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    modifyVars: {
                        // 'primary-color': '#1DA57A',
                        // 'link-color': '#1DA57A',
                        // 'border-radius-base': '2px',
                    },
                    javascriptEnabled: true,
                }
            }

        }
    },
    // 修改webpack的配置
    configureWebpack: {
        // 不需要打包的插件
        externals: {
            // 'vue': 'Vue',
            // 'vue-router': 'VueRouter',
        },
        // resolve: {
        //     alias: {
        //         '@': resolve('src'),
        //     }
        // }
    },
    chainWebpack(config) {

        // 内置的 svg Rule 添加 exclude
        config.module
            .rule('svg')
            .exclude.add(/iconsvg/)
            .end();

        // 添加 svg-sprite-loader Rule
        config.module
            .rule('svg-sprite-loader')
            .test(/.svg$/)
            .include.add(/iconsvg/)
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader');

        // 添加 svgo Rule
        config.module
            .rule('svgo')
            .test(/.svg$/)
            .include.add(/iconsvg/)
            .end()
            .use('svgo-loader')
            .loader('svgo-loader')
            .options({
                // externalConfig 配置特殊不是相对路径，起始路径是根目录
                externalConfig: './src/assets/iconsvg/svgo.yml',
            });

        // 解决此报警 iconpark-icon
        config.module
            .rule('vue')
            .use('vue-loader')
            .tap(options => {
                options.compilerOptions = options.compilerOptions || {};
                options.compilerOptions.isCustomElement = tag => tag === 'iconpark-icon'
                // modify the options...
                return options
            })



        // config.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js')
        // config.resolve.alias
        // .set("@", resolve("src"));
    }


});
