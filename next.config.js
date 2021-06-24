module.exports = {
    async headers() {
        return [
            {
                source: '/api/og-image.png',
                headers: [
                    {
                        key: 'Content-Type',
                        value: 'image/png'
                    },
                    {
                        key: 'Cache-Control',
                        value: 'public, immutable, no-transform, s-max-age=21600, max-age=21600'
                        // value: 'public, immutable, no-transform, s-maxage=31536000, max-age=31536000',
                    },
                ],
            },
        ]
    },
}
