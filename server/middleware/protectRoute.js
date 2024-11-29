import jwt from "jsonwebtoken"
import User from "../models/user.models.js";


const protectRoute =(req,res,next)=>{

  
    try {
      const token = req.cookies.jwt;
      const refreshTokenToken = req.headers["refresh-token"];
      

      if (!token) {
        return res
          .status(401)
          .json({ error: "Unauthorized: No token Provided" });
      }

      const decode = jwt.verify(token, process.env.JWT_SECRET);

      if (!decode) {
        return res.status(403).json({ error: "Unauthorized: Invalid token " });
      }

      const user = User.findOne({ _id: decode.userId }).select("-password");
      if (!user) {
        return res.status(403).json({ error: "user not found " });
      }
      
      // RefreshToken

       if (!refreshTokenToken) {
         return res.status(401).json({ error: "No refresh token provided" });
       }
      const decodeRefreshToken = jwt.verify(
        refreshTokenToken,
        process.env.JWT_SECRET
      );

      if (!decodeRefreshToken) {
        return res
          .status(403)
          .json({ error: "Unauthorized: Invalid  RefreshToken token " });
      }

      if (!user) {
        return res.status(401).json({ error: "No refresh token provided" });
      }

      req.user = decode.userId;
      next()
      
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(403).json({ error: "Refresh token expired" });
      }
      console.log(" error in protectRoute controller ", error.name);
      res.status(500).json({ error: "Internal Server Error" });
    }
}

export default protectRoute;
