const { MongoClient } = require('mongodb');

const url = '';

const dbConnect = (collectionName, schemaValidation, cb) => {
    MongoClient.connect(url)
        .then(async (client) => {
            const db = client.db('');

            const collectionExists = await db.listCollections({ name: collectionName }).hasNext();

            if (!collectionExists) {
                await db.createCollection(collectionName, {
                    validator: schemaValidation,
                    validationAction: 'error',
                });
            }

            await cb(db.collection(collectionName));

            client.close();
        })
        .catch((error) => {
            console.error('Connection error:', error);
        });
};

module.exports = dbConnect;
