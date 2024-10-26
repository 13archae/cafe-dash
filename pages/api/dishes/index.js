//const { MongoClient, ServerApiVersion } = require('mongodb');

//session MongoDB Client
import clientPromise from "@/lib/mongodb";
const client = await clientPromise;

async function getDishes(cafeId, querystring) {
  try {
    //await client.connect();

    const database = client.db("cafe-app");
    const collection = database.collection("dishes");

    let query = {};

    if (!querystring || querystring.length < 1) {
      query = { cafeId: { $eq: cafeId } };
    } else {
      query = { name: { $regex: querystring, $options: "i" } };
    }

    // Find all documents in the collection
    const result = await collection.find(query).toArray();

    console.log("In dishes api: ", result);
    return result;
  } catch (error) {
    console.error("Error in Dishes: ", error);
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { cafeId, query } = req.body;
    console.log(`API DISHES: cafeId: ${cafeId}  ::  query: ${query}`);
    try {
      const result = await getDishes(cafeId, query);
      res.status(200).json({ success: true, result });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
