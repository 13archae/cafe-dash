import mongoose from 'mongoose';
import User from './user-model';
import conn from '../../../components/Connect';

export default async function handler(req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    
    /* Save user to database */

    
    /** Create a new User object */
    const user = new User({
        username,
        email,
        password
    });
    
    // Insert the article in our MongoDB database
    await user.save();



    res.status(200).json({ 'username': username, 'email': email, 'password': password });
  }