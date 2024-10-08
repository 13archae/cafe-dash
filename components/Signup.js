// pages/api/signup.js

import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://13archae:13archae13archae@cluster0.5soii.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});

async function insertUser(username, email, password) {
  try {
    await client.connect();

    const database = client.db('cafe-app');
    const collection = database.collection('users');

    const user = {
      username: username,
      email: email,
      password: password,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await collection.insertOne(user);
    return result;
  } finally {
    await client.close();
  }
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;
    try {
      const result = await insertUser(username, email, password);
      res.status(200).json({ success: true, result });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}