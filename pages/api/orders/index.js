//const { MongoClient, ServerApiVersion } = require('mongodb');

//session MongoDB Client
import clientPromise from '@/lib/mongodb';
const client = await clientPromise;

const stripe = require("stripe")(
  // Enter your private key for test environment of STRIPE here
  process.env.STRIPE_SECRET_KEY
);

async function insertOrder( userId, address, amount, dishes, token, city, state) {
  try { 

    //await client.connect();

    console.log("Token in ")

    const stripeAmount = Math.floor(amount * 100);
    // charge on stripe
    const charge = await stripe.charges.create({
      amount: stripeAmount,
      currency: "usd",
      description: `Order ${new Date()} by ${userId}`,
      source: token,
    });

    const database = client.db('cafe-app');
    const collection = database.collection('orders');

    const order = {
      user_id: userId,
      charge_id: charge.id,
      amount: stripeAmount,
      address: address,
      dishes: dishes,
      city: city,
      state: state,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await collection.insertOne(order);
    return result;
  } catch(error) {
    console.error("Error in Orders: ", error);
  }
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, address, amount, dishes, token, city, state } = req.body;
    try {
      const result = await insertOrder(userId, address, amount, dishes, token, city, state);
      res.status(200).json({ success: true, result });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}