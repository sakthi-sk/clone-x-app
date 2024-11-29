import jwt from "jsonwebtoken"

const generateToken =(userId,res)=>{
   const token = jwt.sign({ userId }, process.env.JWT_SECRET,{expiresIn:"15d"});
   
   res.cookie("jwt",token,{
    maxAge:50*24*60*1000, 
    httpOnly:true ,
    sameSite:"strict",
    secure : process.env.NODE_ENV !== "development"
    })

}

const generateRefreshToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;

  
};

export {generateToken, generateRefreshToken };