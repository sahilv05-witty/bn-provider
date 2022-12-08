const { createProxyMiddleware } = require('http-proxy-middleware');

const proxy = {
  target: 'http://localhost:5000/graphql',
  changeOrigin: true,
};

module.exports = function (app) {
  app.use('/api', createProxyMiddleware(proxy));
};
