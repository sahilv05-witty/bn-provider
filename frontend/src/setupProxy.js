const { createProxyMiddleware } = require('http-proxy-middleware');

const proxy = {
  target: 'http://localhost:5000/graphql',
  changeOrigin: true,
  // headers: {
  //   authorization: 'apikey YOUR_API_KEY',
  // },
};

module.exports = function (app) {
  app.use('/api', createProxyMiddleware(proxy));
};
