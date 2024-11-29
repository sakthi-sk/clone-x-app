import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser"
import cloudinary from "cloudinary";
import cors from "cors"
import path from "path"


// router import
import authRoute from "./routes/auth.Route.js";
import userRoute from "./routes/user.Route.js";
import postRoute from "./routes/post.Route.js";
import notificationRoute from "./routes/notification.Route.js"
// router importEnd

dotenv.config()
const app = express();
const __dirname=path.resolve()

cloudinary.config({
  cloud_name: process.env.CLOUDNARY_COLUD_NAME,
  api_key: process.env.CLOUDNARY_API_KEY,
  api_secret: process.env.CLOUDNARY_API_SECRET_KEY,
});



app.use(cors(
  // {
  //   origin: "http://localhost:3000",
  //   credentials:true
  // }
)
);
app.use(express.json({limit:"5mb"}));
app.use(express.urlencoded({
  extended:true 
}))


const PORT = process.env.PORT;
 

app.use(cookieParser());

app.use("/api/auth",authRoute)
app.use("/api/user", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/notifications", notificationRoute);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
  app.listen(PORT, () => {
    console.log(`Server is Running PortNumber ${PORT} `);
    connectDB();

    
  });


