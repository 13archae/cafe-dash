const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://13archae:13archae13archae@cluster0.5soii.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: ServerApiVersion.v1
});

async function login(username, password) {
  try {
    await client.connect();

    const database = client.db('cafe-app');
    const collection = database.collection('users');

    const query = {  $and: [{"username": {$eq: username}}, {"password": {$eq: password}}] }; ;

    // Find all documents in the collection
    const result = await collection.find(query).toArray();

    console.log(result);
    return result;
  } finally {
    await client.close();
  }
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    try {
      const result = await login(username, password);
      res.status(200).json({ success: true, result });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}