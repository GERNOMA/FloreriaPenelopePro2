/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        webpackBuildWorker: true,
    },
    output: 'standalone',
    images: {
        domains: ['floreria-web-bucket.s3.sa-east-1.amazonaws.com'],
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'floreria-web-bucket.s3.sa-east-1.amazonaws.com',
                port: '',
                pathname: '/',
            }
        ]
    }
}

module.exports = nextConfig
