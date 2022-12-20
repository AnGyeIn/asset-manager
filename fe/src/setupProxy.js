const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/v0", {
      target: process.env.REACT_APP_SERVER_URL,
      changeOrigin: true,
    })
  );
};
