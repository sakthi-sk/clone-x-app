import {  user } from "../constants/apiEndPoints";
import { apiUtils } from "../utils/apiUtils";





const getSuggestedUserList = async () => {
  try {
    const res = await apiUtils.getWithToken(user.suggested);
   

    return res.data;
  } catch (error) {
   
    throw error.response.data.error || "Something Went Wrong";
  }
};
const getProfileUserList = async (value) => {
  try {
    const res = await apiUtils.getWithToken(`${user.ProfileUser}/${value}`);
   
    return res;
  } catch (error) {
  

    throw error.response.data.error || "Something Went Wrong";
  }
};

const updateUser = async (value) => {
 
  
  try {
    const res = await apiUtils.postWithToken(user.updateUser, value);
   

    return res;
  } catch (error) {
    throw error.response.data.error || "Something Went Wrong";
  }
};

const followUnFollowPost = async (value) => {
  try {
    const res = await apiUtils.postWithToken(`${user.followUnFollow}/${value}`,{});
   

    return res;
  } catch (error) {
    throw error.response.data.error || "Something Went Wrong";
  }
};

export {
  getSuggestedUserList,
  getProfileUserList,
  updateUser,
  followUnFollowPost,
};