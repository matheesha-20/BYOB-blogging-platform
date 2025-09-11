import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
import User from './Schema/User.js';
import { nanoid } from 'nanoid';
import jwt  from 'jsonwebtoken';
import cors from 'cors';


const server = express();

let PORT = 3000;

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

server.use(express.json());
server.use(cors());

mongoose.connect(process.env.DB_LOCATION)
  .then(async () => {
    console.log("Connected to MongoDB");
    await User.init();
    //await YourModel.init();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });



const fromatDatatosend = (user) => {

  const access_token = jwt.sign({ id:user._id}, process.env.SECRET_ACCESS_KEY)

    return {
        access_token,
        profile_img:user.personal_info.profile_img,
        username:user.personal_info.username,
        fullname:user.personal_info.fullname
    }
}

  const generateUsername = async (email) => {
    let username = email.split("@")[0];

    let isUsernamenotUnique = await User.exists({"personal_info.username": username});

    isUsernamenotUnique ? username += nanoid().substring(0, 5) :"";

    return username;
  }

server.post("/signup", (req, res) => {

   let {fullname,email,password} = req.body;

   //validating the data from frontend

   if (fullname.length < 3) {

        return res.status(403).json({"error" : "Fullname must be at least 3 letters long"})
    
   } 
   if (!email.length) {

        return res.status(403).json({"error" : "Enter Email"})
    
   }
   if (!emailRegex.test(email)) {
    
        return res.status(403).json({"error" : "Enter a valid Email"}) 
   }
   if (password.length < 6) {

        return res.status(403).json({ error: "Password must be at least 6 characters long" });
   }
   if (!passwordRegex.test(password)) {

        return res.status(403).json({"error" : "Enter a valid Password"}) 
    
   }

   bcrypt.hash(password, 10, async (err, hashed_password) => {

            
        let username = await generateUsername(email);
        let password = hashed_password

        let user = new User({
            personal_info: {
                fullname,email,password,username
            }
        })

        await user.save().then((u) => {

            return res.status(200).json({ "success": "Submitted Successfully" });
        })

        .catch(err => {
            if (err.code == 11000) {
                return res.status(500).json({"error": "Email already exists "})

            }
            return res.status(500).json({ "error": err.message});
        })
   })

   


   //return res.status(200).json({"status" : "okay"})

})

server.post("/signin", (req, res) => 
{
  let { email, password } = req.body;

  User.findOne({ "personal_info.email":email})
  .then((user) => {

    if (!user) {
        return res.status(403).json({"error":"Email Not Found!"});
    }

    bcrypt.compare(password, user.personal_info.password, (err, result) => {

      if(err){
        return res.status(403).json({"error": "Error Occured While Login Try Again!"});
      }

      if(!result){
          return res.status(403).json({"error": "Incorrect Password!"});
      }else{
        return res.status(200).json(fromatDatatosend(user));
      }
    })

  })
  .catch(err => {
    console.log(err.message);
    return res.status(500).json({"error": err.message});
    
  })

})

server.listen(PORT, '0.0.0.0', () => {
  console.log("Listening on port " + PORT);
});