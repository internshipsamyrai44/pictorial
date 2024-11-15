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
  webpack: (config: Configuration) => {
    const oneOf = config.module.rules.find((rule) => typeof rule.oneOf === 'object');
    if (oneOf) {
      const sassRule = oneOf.oneOf.find((rule) => regexEqual(rule.test, /\.module\.(scss|sass)$/));
      if (sassRule) {
        const sassLoader = sassRule.use.find((el) => el.loader.includes('next/dist/compiled/sass-loader'));
        if (sassLoader) {
          sassLoader.loader = 'sass-loader';
        }
      }
    }

    return config;
  }
};

export default nextConfig;
