const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://95.165.102.189:4000', // Замените на ваш адрес сервера
      changeOrigin: true,
    })
  );
};