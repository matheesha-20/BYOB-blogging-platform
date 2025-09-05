import epxress from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


const server = epxress();

let PORT = 3000;

mongoose.connect(process.env.DB_LOCATION)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

server.listen(PORT,() => {
    console.log("listining on port " + PORT);
    
})