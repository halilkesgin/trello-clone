const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "img.clerk.com"
            }
        ]
    }
}

module.exports = nextConfig
