module.exports = {
    distDir: '.next', // 빌드후 생성되는 파일 디렉토리
    webpack (config) { // config 에 next의 기본적인 웹팩 설정이 들어있다.
        console.log('config', config);
        console.log('rules', config.module.rules[0]);
        const prod = process.env.NODE_ENV;
        return { // 웹팩 설정들을 바꿈
            ...config, // 기본설정 유지 후 오버라이딩
            mode: prod === 'production' ? 'production' : 'development',
            devtool: prod === 'production' ? 'hidden-source-map' : 'eval',

        }
    },
};
