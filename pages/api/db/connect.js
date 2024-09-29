import mongoose from 'mongoose';
import  User from './model/User';

mongoose.connect("mongodb+srv://13archae@gmail.com:13archae13archae@cluster0.5soii.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

/** Create a new User object */
const user = new User({
    username,
    email,
    password
});

// Insert the article in our MongoDB database
await user.save();
