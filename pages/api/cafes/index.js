//const { MongoClient, ServerApiVersion } = require('mongodb');

//session MongoDB Client
import clientPromise from '@/lib/mongodb';
const client = await clientPromise;

async function getCafes() {
  try {
    //await client.connect();

    const database = client.db('cafe-app');
    const collection = database.collection('cafes');

    const query = {};

    // Find all documents in the collection
    const result = await collection.find(query).toArray();

    console.log(result);
    return result;
  } catch(error) {
    console.error("Error in Cafes: ", error);
  }
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { username, password } = req.body;
    try {
      const result = await getCafes(username, password);
      res.status(200).json({ success: true, result });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}