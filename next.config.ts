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
  /*images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'staging-it-incubator.s3.eu-central-1.amazonaws.com',
        port: '',
        pathname: 'trainee-instagram-api/Image/!**',
        search: ''
      }
    ]
  },*/
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

    return config;
  }
};

export default nextConfig;
