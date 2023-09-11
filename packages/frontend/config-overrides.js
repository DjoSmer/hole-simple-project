const { useBabelRc, addWebpackAlias, override } = require('customize-cra');
const path = require('path');

module.exports = {
  webpack: override(
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useBabelRc(),
    addWebpackAlias({
      '~': path.resolve(__dirname, './src/'),
      ms: path.resolve(__dirname, './src/modules/'),
    })
  ),
};
