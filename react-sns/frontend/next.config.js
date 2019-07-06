const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const webpack = require('webpack');
const Compression = require('compression-webpack-plugin');

module.exports = withBundleAnalyzer({
    distDir: '.next', // 빌드후 생성되는 파일 디렉토리
    analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzeConfig: {
        server: {
            analyzerMode: 'static',
            reportFilename: '../bundles/server.html',
        },
        browser: {
            analyzerMode: 'static',
            reportFilename: '../bundles/client.html',
        },
    },
    webpack (config) { // config 에 next의 기본적인 웹팩 설정이 들어있다.
        console.log('config', config);
        console.log('rules', config.module.rules[0]);
        const prod = process.env.NODE_ENV;
        const plugins = [
                ...config.plugins,
                new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
        ];

        if (prod) { // 배포시에만 compression사용
            plugins.push(new Compression());
        }

        return { // 웹팩 설정들을 바꿈
            ...config, // 기본설정 유지 후 오버라이딩
            mode: prod === 'production' ? 'production' : 'development',
            devtool: prod === 'production' ? 'hidden-source-map' : 'eval',
            module: {
                ...config.module,
                rules: [
                    ...config.module.rules,
                    {
                        loader: 'webpack-ant-icon-loader',
                        enforce: 'pre',
                        include: [
                            require.resolve('@ant-design/icons/lib/dist'),
                        ],
                    },
                ],
            },
            plugins,
        }
    },
});
