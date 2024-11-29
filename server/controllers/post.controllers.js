 import Notification from "../models/notification.models.js";
 import Post from "../models/post.models.js"
 import User from "../models/user.models.js"
 import cloudinary from "cloudinary";
 
 export const createPost = async(req,res)=>{
    try {
        
        const {text}=req.body
        let {img}=req.body
        const userId=req.user

       const user= await User.findOne({_id:userId})

       if(!user){
           return res.status(404).json({ error: "User Not Found" });
       }

        if (!text && !img) {
          return res.status(400).json({ error: "Post must Have text or Img" });
        }

        if(img){
          const uploadedPostImg = await cloudinary.uploader.upload(img, {
            resource_type: "image",
          });
          console.log(uploadedPostImg, "uploadedPostImg");
           img = uploadedPostImg.secure_url;

            const newPost = new Post({
              user: userId,
              text,
              img,
            });

            await newPost.save();
            res.status(201).json({ data: newPost });
        }


       

    } catch (error) {
      console.log(" error in  createPost controller", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
 }


  export const linkUnlikePost = async (req,res) => {

    try {
        const{id}=req.params
        const userId = req.user
      
        

        const post = await Post.findOne({_id:id})
         if (!post) {
           return res.status(401).json({ error: "post Not Found" });
         }

        const userLikePost=post.likes.includes(userId)

         if (userLikePost) {
            //unlike post
            await Post.updateOne({_id:id},{$pull:{likes:userId}})
             await User.updateOne( { _id: userId }, { $pull: { likePosts: id } });

             const updatedLikes = post.likes.filter(
               (likeId) => likeId.toString() !== userId.toString()
             );
             res
               .status(200)
               .json({ message: "unliked successfully", updatedLikes });
           
         } else {
           //like post
           await Post.updateOne({ _id: id }, { $push: { likes: userId } });
           await User.updateOne({ _id: userId }, { $push: { likePosts: id } });
           await post.save()

           // notification
           const notification = new Notification({
             from:userId,
             to:post.user,
             type:"like"
             
           })

           await notification.save()
          const  updatedLikes= post.likes;
            res .status(200)
              .json({ message: "liked successfully", updatedLikes });
         }

       
      } catch (error) {
      console.log(" error in  linkUnlikePost controller", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };



  export const createComment = async (req,res) => {
   try {
        const {text}=req.body;
    const { id } = req.params;
    const userId=req.user

    if(!text){
        return  res.status(400).json({ error: "comment text Required" });
    }

    const post = await Post.findOne({_id:id})
    if(!post){
          return  res.status(401).json({ error: "post Not Found" });
    }
      const comment = {
         user:userId,
        text,
      };

      post.comment.push(comment)
      await post.save()
      res.status(200).json({ data:post});

      // create notification 


    } catch (error) {
      console.log(" error in createComment controller", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };



  export const deletePost = async (req,res) => {
    try {

        const {id}=req.params
        console.log(id,"id");
        

        const post= await Post.findOne({ _id:id})

        if(!post){
             return res.status(404).json({ error: "Post Not found" });
        }

        console.log("user:", post.user.toString());
        
        if (post.user.toString() !== req.user) {
          return res
            .status(401)
            .json({ error: "Your are not  authorized to delete this post" });
        }

        if (post.img) {
            const imgId = post.img.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(imgId);
           
        }

         await Post.deleteOne({ _id: id });
         res.status(200).json({ error: "Post Delete successfully" });

    } catch (error) {
      console.log(" error in  deletePost controller", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };


  export const getAllPosts = async (req,res)=>{
     try {

       const posts = await Post.find().sort({ createdAt: -1 }).populate({
         path: "user",
         select: "-password",
       }).populate({
        path: "comment.user", 
        select: ["username" ,"name","profileImg","_id"], 
      });
       if(!posts.length===0){
          res.status(401).json({data:[],message:"No data"});
       }
        res.status(200).json({ data: posts });

        
     } catch (error) {
        console.log(" error in  getAllPosts controller", error);
        res.status(500).json({ error: "Internal Server Error" });
     }
  }

   export const getLikedPost = async (req, res) => {
     try {

       const userId = req.user;
        
        

        const user = await User.findOne({_id:userId})
        if(!user){
              res.status(401).json({ error: "user not found" });
        }
        const likedPosts = await Post.find({ _id: { $in: user.likePosts } })
          .populate({
            path: "user",
            select: ["name", "username", "_id", "profileImg"],
          })
          .populate({
            path: "comment.user",
            select: ["name", "username", "_id", "profileImg"],
          });

          if (likedPosts.length===0){res.status(200).json({ data:[],message:"No liked data" });}
           res.status(200).json({ data: likedPosts });
     
     } catch (error) {
       console.log(" error in  getLikedPost controller", error);
       res.status(500).json({ error: "Internal Server Error" });
     }
   };

   export const getFollowingPost = async(req,res)=>{
       try {

      const userId=req.user
     
      
      const user = await User.findOne({ _id: userId });

     if(!user){
         return res.status(401).json({ error: "User Not Found" });
     }

      const following = user.following;

      const followingPostList = await Post.find({
        user: { $in: following },
      })
        .sort({ createdAt: -1 })
        .populate({
          path: "user",
          select: ["username","profileImg"]
        })
        .populate({
          path: "comment.user",
          select: ["username","profileImg"],
        });

         res.status(200).json({ data: followingPostList });
        
       } catch (error) {
        console.log(" error in  getLikedPost controller", error);
        res.status(500).json({ error: "Internal Server Error" });
       }
   }

   export const getUserPost =async(req,res)=>{
     try {
         
        const {username}=req.params
        console.log(username, "username, getUserPost");
        

        const user = await User.findOne({ username });

        if(!user){
             return res.status(404).json({ error: "User not found" });
        }

        const post = await Post.find({ user: user._id })
          .sort({ createdAt: -1 })
          .populate({
            path: "user",
            select: ["username", "profileImg"],
          })
          .populate({
            path: "comment.user",
            select: ["username", "profileImg"],
          });
          
        if (!post) {
          return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ data:post });
        

     } catch (error) {
         console.log(" error in  getUserPost controller", error);
         res.status(500).json({ error: "Internal Server Error" });
     }
   }

   export const getComment = async (req, res) => {
     try {
       
       const { id } = req.params;
      const post = await Post.findOne({ _id: id })
        .sort({ createdAt: -1 })
        .populate({
          path: "comment.user",
          select: ["username", "profileImg", "name"],
        });

       if (!post) {
         return res.status(401).json({ error: "post Not Found" });
       }

       const postCommentList = post.comment;
       
       res.status(200).json({ data: postCommentList });

       // create notification
     } catch (error) {
       console.log(" error in createComment controller", error);
       res.status(500).json({ error: "Internal Server Error" });
     }
   };