import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
let client;
let clientPromise;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const globalWithMongo = global;

if (!globalWithMongo._mongoClientPromise) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
  globalWithMongo._mongoClientPromise = clientPromise;
} else {
  clientPromise = globalWithMongo._mongoClientPromise;
}

export default clientPromise;