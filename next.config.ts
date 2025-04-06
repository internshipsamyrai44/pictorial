/** @type {import('next').NextConfig} */
import type { NextConfig } from 'next';
import { webpack } from 'next/dist/compiled/webpack/webpack';
import Configuration = webpack.Configuration;

const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

const regexEqual = (x: RegExp, y: RegExp): boolean => {
  return (
    x instanceof RegExp &&
    y instanceof RegExp &&
    x.source === y.source &&
    x.global === y.global &&
    x.ignoreCase === y.ignoreCase &&
    x.multiline === y.multiline
  );
};

const nextConfig: NextConfig = {
  env: {
    RECAPTCHA_ENTERPRISE_API_KEY: process.env.RECAPTCHA_ENTERPRISE_API_KEY,
    NEXT_PUBLIC_PATH_AUTH_GITHUB: process.env.NEXT_PUBLIC_PATH_AUTH_GITHUB,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_CLIENT_ID_GOOGLE: process.env.NEXT_PUBLIC_CLIENT_ID_GOOGLE
  },
  reactStrictMode: true,
  webpack: (config: Configuration) => {
    const oneOf = config.module.rules.find((rule: { oneOf: Object }) => typeof rule.oneOf === 'object');
    if (oneOf) {
      const sassRule = oneOf.oneOf.find((rule: { test: RegExp }) => regexEqual(rule.test, /\.module\.(scss|sass)$/));
      if (sassRule) {
        const sassLoader = sassRule.use.find((el: { loader: string }) =>
          el.loader.includes('next\\dist\\compiled\\sass-loader')
        );
        if (sassLoader) {
          sassLoader.loader = 'sass-loader';
        }
      }
    }

    // Grab the existing rule that handles SVG imports
    // eslint-disable-next-line no-unused-vars
    const fileLoaderRule = config.module.rules.find((rule: { test: { test: (arg0: string) => any } }) =>
      rule.test?.test?.('.svg')
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/ // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack']
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  }
};

export default withNextIntl(nextConfig);

// Now, set up the plugin which creates an alias to provide a request-specific i18n configuration to Server Components (specified in the next step).

// const createNextIntlPlugin = require('next-intl/plugin');

// const withNextIntl = createNextIntlPlugin();

// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// module.exports = withNextIntl(nextConfig);
