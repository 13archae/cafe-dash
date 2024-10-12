//const { MongoClient, ServerApiVersion } = require('mongodb');
import { getServerSession } from "next-auth/next";

//session MongoDB Client
import clientPromise from '@/lib/mongodb';
const client = await clientPromise;



async function getOrders(userId) {
  try {

    console.log("In Api Order userId: ", userId);

    console.log("api userId: ", userId);    

    const database = client.db('cafe-app');
    const collection = database.collection('orders');

    const query = {"user_id": {$eq: userId}};

    // Find all documents in the collection
    const result = await collection.find(query).toArray();

    console.log(result);
    return result;
  } catch(error) {
    console.error("Error in Orders: ", error);
  }
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    
    try {
      const { userId } = req.body;
      const result = await getOrders(userId);
      res.status(200).json({ success: true, result });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}