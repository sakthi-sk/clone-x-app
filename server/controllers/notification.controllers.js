import Notification from "../models/notification.models.js";


export const getNotification =async (req,res)=>{
     try {

        const userId = req.user;
         
        const userNotification = await Notification.find({ to: userId })
          .sort({ createdAt: -1 })
          .populate({
            path: "from",
            select: ["username", "profileImg"],
          });
        

     await Notification.updateMany({ to: userId }, { read: true });

      res.status(200).json({ data: userNotification });
        
     } catch (error) {
          console.log(" error in  getNotification controller", error);
          res.status(500).json({ error: "Internal Server Error" });
     }
}

export const deleteNotification = async (req, res) => {
  try {

     const userId = req.user;
     await Notification.deleteMany({ to: userId });
      res.status(200).json({ massage: "notification delete" });


  } catch (error) {
    console.log(" error in  getNotification controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};