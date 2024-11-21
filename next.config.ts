/** @type {import('next').NextConfig} */
import type { NextConfig } from 'next';
import { webpack } from 'next/dist/compiled/webpack/webpack';
import Configuration = webpack.Configuration;

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

    return config;
  }
};

export default nextConfig;
