/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['arxiv.org'],
  },
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/transformer-paper-site' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/transformer-paper-site/' : '',
  trailingSlash: true,
  // 自定义其他配置项
}

module.exports = nextConfig; 