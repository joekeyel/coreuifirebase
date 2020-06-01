const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/loginprocess',
    createProxyMiddleware({
      target: 'https://nd.tm.com.my/spheremobile_test/loginprocess.php',
      changeOrigin: true,
    })
  );

  app.use(
    '/fetchBadge',
    createProxyMiddleware({
      target: 'https://10.54.5.141:3443/claritybqm/reportFetch/?scriptName=DC_BADGE',
      changeOrigin: true,
      secure:false
    })
  );
};