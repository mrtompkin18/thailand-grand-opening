module.exports = {
    async headers() {
        return [
            {
                source: '/api/og',
                headers: [
                    {
                        key: 'Content-Type',
                        value: 'image/png'
                    },
                    {
                        key: 'Cache-Control',
                        value: 'private, max-age=0, no-cache'
                        // value: 'public, immutable, no-transform, s-maxage=31536000, max-age=31536000',
                    },
                ],
            },
        ]
    },
}
