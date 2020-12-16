const { createConfig } = require('@edx/frontend-build');

module.exports = createConfig('webpack-dev', {
  devServer: {
    host: '0.0.0.0',
    port: process.env.PORT || 3000, // Use our port
    historyApiFallback: true,
    hot: true,
    inline: true,
    disableHostCheck: true, // Local development with custom domain
    historyApiFallback: {
      rewrites: [
        { from: /\/eol\/eol_progress_tab\/static/, to: `/eol/eol_progress_tab/static/` }
      ]
    }
  },
});
