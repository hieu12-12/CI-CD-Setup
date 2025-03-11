import db from '../config/connection.js';
export default async (collectionName) => {
    try {
        // Ensure database connection is ready
        if (!db || db.readyState !== 1) {
            throw new Error("Database is not connected.");
        }
        // Check if the collection exists
        const modelExists = await db.db?.listCollections({ name: collectionName }).toArray();
        if (modelExists?.length) {
            await db.dropCollection(collectionName);
        }
    }
    catch (err) {
        console.error("Error in cleanDb:", err);
        throw err;
    }
};
