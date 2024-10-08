//const { MongoClient, ServerApiVersion } = require('mongodb');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//session MongoDB Client
import clientPromise from '@/lib/mongodb';
const client = await clientPromise;



async function insertOrder( userId, address, amount, dishes, source, city, state) {
  try { 

    //console.log("Source in: ", source);

    const stripeAmount = Math.floor(amount * 100);
    // charge on stripe
    const charge = await stripe.charges.create({
      amount: stripeAmount,
      currency: "usd",
      description: `Order ${new Date()} by ${userId}`,
      source: source.id,
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

    
    try {

      console.log("Request Body: ", req.body);

    const { userId, address, amount, dishes, source, city, state } = JSON.parse(req.body);

      console.log("userId: ", userId, "\naddress: ", address, "\namount: ", amount, "\dishes: ", dishes, "\nsource: ", source, "\ncity: ", city, "\nstate: ", state)

      const result = await insertOrder(userId, address, amount, dishes, source, city, state);
      res.status(200).json({ success: true, result });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}