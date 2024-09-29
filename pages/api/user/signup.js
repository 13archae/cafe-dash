import mongoose from 'mongoose';
import model from 'mongoose';
import User from './model/User';

export default function handler(req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    // Then save email to your database, etc...

    res.status(200).json({ 'username': username, 'email': email, 'password': password });
  }