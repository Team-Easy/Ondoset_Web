const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/admin', // 프록시를 적용할 요청 경로
        createProxyMiddleware({
            target: 'http://ceprj.gachon.ac.kr:60019', // 프록시 요청이 전달될 서버의 주소
            changeOrigin: true, // 필요한 경우, 호스트 헤더를 변경하여 요청 보내기
        })
    );
};