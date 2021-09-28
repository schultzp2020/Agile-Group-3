/* eslint-disable @typescript-eslint/no-var-requires */
const typescriptIsTransformer = require('typescript-is/lib/transform-inline/transformer').default;
const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([], {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.ts$/,
      exclude: /node_modules/,
      loader: 'ts-loader',
      options: {
        getCustomTransformers: (program) => ({
          before: [typescriptIsTransformer(program)]
        })
      }
    });
    return config;
  }
});
