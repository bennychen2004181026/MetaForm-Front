const path = require('path');

module.exports = {
  devServer: { port: 8001 },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets/'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@hooks': path.resolve(__dirname, 'src/hooks/'),
      '@layouts': path.resolve(__dirname, 'src/layouts/'),
      '@pages': path.resolve(__dirname, 'src/pages/'),
      '@routes': path.resolve(__dirname, 'src/routes/'),
      '@services': path.resolve(__dirname, 'src/services/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
    },
  },
};
