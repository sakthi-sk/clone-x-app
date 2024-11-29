import { authEndPoints, postEndPoints } from "../constants/apiEndPoints";
import { apiUtils } from "../utils/apiUtils";


const newPost=async(value)=>{
 try {

   const res = await apiUtils.postWithToken(postEndPoints.newPost, value);
   return res;
 } catch (error) {
   
    
   throw error.response.data.error || "Something Went Wrong";
 }
}


const getAllPosts = async () => {
  try {
    
    const res = await apiUtils.getWithToken(postEndPoints.allPost);
 

    return res.data;
  } catch (error) {
   

    throw error.response.data.error || "Something Went Wrong";
  }
};

const commentPost = async (value) => {
  const { postId, userComment } = value;
   const text =userComment
 
   
  try {
    const res = await apiUtils.postWithToken(
      `${postEndPoints.comment}/${postId}`,
      { text }
    );
   

    return res.data;
  } catch (error) {
   

    throw error.response.data.error || "Something Went Wrong";
  }
};

const getFollowingPosts = async () => {
  try {
    const res = await apiUtils.getWithToken(postEndPoints.followingPost);
   

    return res.data;
  } catch (error) {
   

    throw error.response.data.error || "Something Went Wrong";
  }
};


const likeUnLikePost = async (value) => {
  
  const id=value
 
  

  try {
    const res = await apiUtils.postWithToken(`${postEndPoints.likeUnlike}/${id}`, { });
   

    return res.updatedLikes;
  } catch (error) {
    

    throw error.response.data.error || "Something Went Wrong";
  }
};


const getLikedPosts = async () => {
  try {
    const res = await apiUtils.getWithToken(postEndPoints.likePost);
    

    return res.data;
  } catch (error) {
    console.log(error, "getAllPosts");

    throw error.response.data.error || "Something Went Wrong";
  }
};

const getUserPosts = async (value) => {
  try {
    const res = await apiUtils.getWithToken(`${postEndPoints.userPost}/${value}`);
    

    return res.data;
  } catch (error) {
    

    throw error.response.data.error || "Something Went Wrong";
  }
};

const deletePosts = async (value) => {
   
   
  try {
    const res = await apiUtils.deleteWithToken( `${postEndPoints.delete}/${value}`);
  

    return res.data;
  } catch (error) {
    console.log(error, "deletePost");
    throw error.response.data.error || "Something Went Wrong";
  }
};

const getNotification= async () => {
  try {
    
    const res = await apiUtils.getWithToken(postEndPoints.notification );
   

    return res.data;
  } catch (error) {
   
    throw error.response.data.error || "Something Went Wrong";
  }
};


const commentGet = async (value) => {
  
  try {
    const res = await apiUtils.getWithToken(
      `${postEndPoints.comment}/${value}`
    );
   

    return res.data;
  } catch (error) {
    console.log(error, "commentGet");
   throw error.response.data.error || "Something Went Wrong";
  }
};




export {
  newPost,
  getAllPosts,
  commentPost,
  getFollowingPosts,
  likeUnLikePost,
  getLikedPosts,
  getUserPosts,
  deletePosts,
  getNotification,
  commentGet,
};