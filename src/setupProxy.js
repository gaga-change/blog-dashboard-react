const proxy = require("http-proxy-middleware");

const ip = "http://localhost:8080" // 修浩

module.exports = function (app) {
  app.use(
    proxy("/api", {
      target: ip,
      pathRewrite: {
        '^/api': '/', // rewrite path
      },
      changeOrigin: true
    })
  )
}
