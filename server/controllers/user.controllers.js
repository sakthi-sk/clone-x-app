import Notification from "../models/notification.models.js";
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import cloudinary from "cloudinary";

  
  export const getProfile= async(req,res)=>{
     try {
         
      const {username}=req.params
      const user = await User.findOne({ username })
        .select("-password")
        .populate({
          path: "followers",
          select: ["username", "name", "profileImg", "_id"],
        })
        .populate({
          path: "following",
          select: ["username", "name", "profileImg", "_id"],
        });

      if(!user){
         return res.status(400).json({error:"user not found"})
      }
       res.status(200).json(user);
        
     } catch (error) {
         console.log(" error in get user Profile controller", error);
         res.status(500).json({ error: "Internal Server Error" });
     }

}

  export const followUnFollowUser = async (req, res) => {
    try {
      const {id} = req.params;

      const userToModify= await User.findById({_id:id})
      const currentUser = await User.findById({ _id: req.user });

      if(id===req.user){
           return res.status(400).json({ error: "You can't unfollow/follow You self" });
      }
      if (!currentUser || !userToModify) {
        return res
          .status(400)
          .json({ error: "user not found" });
      }

      const isFollowing = currentUser.following.includes(id)

      if (isFollowing) {
         // unFollowing
        await User.findByIdAndUpdate(
          { _id: id },
          { $pull: { followers: req.user } }
        );
         await User.findByIdAndUpdate(
           { _id: req.user },
           { $pull: { following: id } }
         );

          return res
            .status(200)
            .json({ message: " Unfollow  successfully" });


      } else {
        // Following
        await User.findByIdAndUpdate({ _id: id }, { $push: { followers :req.user} });
        await User.findByIdAndUpdate({ _id: req.user },{ $push: { following: id } } );

        // send notification
        const newNotification = new  Notification({
         type:"follow",
         from:req.user,
         to:id
        })
        await newNotification.save()
         return res.status(200).json({ message: " follow  successfully" });
      }


     
    } catch (error) {
      console.log(" error in Follow And UnFollow controller", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  export const getSuggestedUser = async (req, res) => {
    try {

      const userId=req.user
   
     const userFollowedByMe = await User.findById({_id:userId}).select("-password");
      const users= await User.aggregate([
         { $match:{
                _id:{$ne:userId}
            }
         },

          { $sample:{
               size:10
            }
          }

      ])

      
      

      const filteredUser = users.filter((user) => !userFollowedByMe.following.includes(user._id));
      const suggestedUsers = filteredUser.slice(0,4)
      suggestedUsers.forEach((user)=>(user.password=null))
      
      
      res.status(200).json({data: suggestedUsers });

    } catch (error) {
      console.log(" error in get user suggested controller", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

 export const UpdateUser = async(req,res)=>{
    try {

   const userId = req.user;
      const {
          username,
          name,
          email,
          currentPassword,
          newPassword,
          bio,
          link,
        } = req.body;
       

       let { profileImg, coverImg } = req.body;

       const user = await User.findById({ _id: userId });
    

      if(!user){
         return res.status(400).json({ error: "User Not Found" });
      }

      if (
        (!currentPassword && newPassword) ||
        (currentPassword && !newPassword)
      ) {
        return res
          .status(400)
          .json({
            error: "please provide both the new password and current password",
          });
      }

      if(currentPassword && newPassword){
         const isMatch = await bcrypt.compare(currentPassword,user.password);
         if(!isMatch){
              return res.status(400).json({ error: "current Password isIncorrect " });
         }

         if (6 > newPassword.length) {
           return res
             .status(400)
             .json({ error: "password must Have atleast 6 char length" });
         }

           const salt = await bcrypt.genSalt(10);
           user.password = await bcrypt.hash(newPassword, salt);
      }

      

      if(email){
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if (!emailRegex.test(email)) {
         return res.status(400).json({ error: "Invalid Email Id" });
      }
      } 
      

      if(profileImg){

         if(user.profileImg){
              await cloudinary.uploader.destroy(
                user.profileImg.split("/").pop().split(".")[0]
              );
         }

           const uploaderProfileImg = await cloudinary.uploader.upload(profileImg);
           profileImg = uploaderProfileImg.secure_url;
      }

      if (coverImg) {
           if (user.coverImg) {
             await cloudinary.uploader.destroy(
               user.coverImg.split("/").pop().split(".")[0]
             );
           }
        const uploaderCoverImg = await cloudinary.uploader.upload(coverImg);
        coverImg = uploaderCoverImg.secure_url;
      }

      user.name= name|| user.name ;  
      user.username = username || user.username; 
      user.email = email || user.email;
      user.bio = bio || user.bio;
      user.link = link || user.link ;
      user.profileImg = profileImg || user.profileImg;
      user.coverImg = coverImg || user.coverImg;

      await user.save()
      user.password=null
      res.status(200).json(user);

     



    } catch (error) {
      console.log(" error in  UpdateUser controller", error);
      res.status(500).json({ error: "Internal Server Error" });
    }

  }


