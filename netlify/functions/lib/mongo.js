const { MongoClient } = require('mongodb');

let cachedClient = global.__mongoClient;

async function connectToMongo(uri) {
    if (!uri) {
        throw new Error('MONGO_URI is not configured. Set it in your Netlify environment variables.');
    }

    if (cachedClient) {
        return cachedClient;
    }

    const client = new MongoClient(uri);

    await client.connect();
    global.__mongoClient = client;
    cachedClient = client;
    return client;
}

module.exports = { connectToMongo };
