//const { MongoClient, ServerApiVersion } = require('mongodb');

//session MongoDB Client
import clientPromise from "@/lib/mongodb";
const client = await clientPromise;

async function getCafes(req, querystring) {
  try {
    //await client.connect();

    const database = client.db("cafe-app");
    const collection = database.collection("cafes");

    const query = { name: { $regex: querystring, $options: "i" } };

    // Find all documents in the collection
    const result = await collection.find(query).toArray();

    console.log(result);
    return result;
  } catch (error) {
    console.error("Error in Cafes: ", error);
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { query } = req.body;
    console.log(`Query: ${query}`);
    try {
      const result = await getCafes(req, query);
      res.status(200).json({ success: true, result });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
