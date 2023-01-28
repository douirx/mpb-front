const withPlugins = require('next-compose-plugins');
const withTypescript = require('@zeit/next-typescript');
const withPreact = require('next-plugin-preact');
const withPreactCompat = require('next-preact-compat');

module.exports = withPlugins([
  withTypescript,
  withPreact,
  withPreactCompat
], {
  webpack(config, options) {
    return config
  }
});