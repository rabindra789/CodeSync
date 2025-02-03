const {createClient} = require('@liveblocks/node');

const liveblocksClient = createClient({
    secret: process.env.LIVEBLOCKS_API_KEY,
})

module.exports = liveblocksClient;