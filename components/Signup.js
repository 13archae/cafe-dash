const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://13archae:13archae13archae@cluster0.5soii.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});

export async function insertUser(username, email, password) {
  try {
    await client.connect();

    const database = client.db('cafe-app');
    const collection = database.collection('users');

    const user = new  {
        username: username,
          email: email,
          password: password,
          createdAt: Date.now,
          updatedAt: Date.now
    };

    const result = await collection.insertOne(user);

    console.log(`Inserted user with _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

//insertDocument().catch(console.dir);
//main().catch(console.error);