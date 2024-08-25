import { MongoClient } from "mongodb";

let client;
let database;

export async function connectToDatabase() {
    if (!client) {
        const mongoURI = process.env.MONGO_URL;
        const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        database = client.db('RQ_Analytics');
        console.log('Connected to MongoDB');
    }
    return { client, database };
}

