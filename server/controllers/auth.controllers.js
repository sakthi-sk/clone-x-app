import User from "../models/user.models.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

import {generateToken,generateRefreshToken} from "../utils/generateToken.js";

export const signup = async (req, res) => {
   try {
    console.log("signup", req.body);
    
     const { username, name, email, password } = req.body;

     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // emil regex

     // Invalid Email Id send res msg
     if (!emailRegex.test(email)) {
       return res.status(400).json({ error: "Invalid Email Id" });
     }

     //  Username and Email get value in mongodb
     const existingEmail = await User.findOne({ email });
     const existingUsername = await User.findOne({ username });

     // Already Existing Username Or Email Id send res msg
     if (existingEmail || existingUsername) {
       return res
         .status(400)
         .json({ error: "Already Existing Username Or Email Id" });
     }

     if(6 > password.length){
       return res.status(400).json({ error: "password must Have atleast 6 char length" });
     }

     //hashing the password

     const salt = await bcrypt.genSalt(10)
     const hashedPassword= await bcrypt.hash(password,salt)

     const newUser = new User({
       username,
       name,
       email,
       password: hashedPassword,
     });

    

     if (newUser){

      generateToken(newUser._id, res);
      const refreshToken = generateRefreshToken(newUser._id, res);
      await newUser.save()
      res
        .status(200)
        .json({ message: "user created Successfully", refreshToken });  
     }
     else{
        res.status(400).json({ message: "Invalid User Data" });
     }

   } catch (error) {
      console.log(" error in signup controller",error );
      res.status(500).json({error:"Internal Server Error"})
      
   }
};




  export const login = async (req, res) => {
    try {

      const {username,password}=req.body

        const user = await User.findOne({ username });
        const isPasswordCorrect= await bcrypt.compare(password,user?.password||"")

        if(!user|| !isPasswordCorrect){
          return res.status(400).json({error:"Invalid username or Password"})
        }

        generateToken(user._id,res)
       const  refreshToken= generateRefreshToken(user._id, res);
        res.status(200).json({
          message: "login Successfully",
          refreshToken,
        });
      


    } catch (error) {
      console.log(" error in login controller", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

export const logout = async (req, res) => {

  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 0, // Expire immediately
    });

     res.status(200).json({ message: "logout Successfully"});
  } catch (error) {
    console.log(" error in logout controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  
};

export const getMe= async (req, res) => {
  try {

    const user = await User.findOne({ _id:req.user }).select("-password"); 
    res.status(200).json({data:user,isAuth:true});

  } catch (error) {
    console.log(" error in logout controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



export const refreshAccessToken = async (req, res) => {
  try {
    // Extract the refresh token from the headers
    const refreshToken = req.headers["refresh-token"];

 

    if (!refreshToken) {
      return res.status(401).json({ error: "No refresh token provided" });
    }

    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    // Check if the refresh token matches the one in the database (optional)
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    // Generate new access and refresh tokens
        const newAccessToken = generateToken(user._id,res);
        const newRefreshToken = generateRefreshToken(user._id);

   // Update refresh token in the database (optional)
   

    // Send the new tokens back to the client
    res.status(200).json({ newRefreshToken });
  } catch (error) {
    console.error("Error in refresh token endpoint:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};