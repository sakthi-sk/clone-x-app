import { authEndPoints } from "../constants/apiEndPoints";
import { removeItemInLocal, removeItemInSession, setItemInLocal, setItemInSession } from "../hooks/StorageLocal";
import { apiUtils } from "../utils/apiUtils"

const postSingUp=async(value)=>{
   try {
      const res = await apiUtils.postWithoutToken(authEndPoints.signup, value);
     
      
      return res
    } catch (error) {
       throw error.response.data.error || "Something Went Wrong";
   }
}

const postLogin= async (value) => {
  try {
    const res = await apiUtils.postWithoutToken(authEndPoints.login, value);
    
    setItemInLocal("refreshToken", res.data.refreshToken);

    return res;
  } catch (error) {
   throw error.response.data.error || "Something Went Wrong";
  }
};

const postLogout = async () => {
  try {
    const res = await apiUtils.postLogout(authEndPoints.logout);
    // console.log(res.data.message, "postLogout");
   removeItemInLocal("refreshToken");
   removeItemInSession("auth")
   removeItemInSession("isAuth");
   


    return res;
  } catch (error) {
   

    throw error.response.data.error || "Something Went Wrong";
  }
};

const getAuthUser = async () => {
  try {
    const res = await apiUtils.getWithToken(authEndPoints.getMe);
    console.log(res, "getAuthUser");
     setItemInSession("auth", JSON.stringify(res.data));
     setItemInSession("isAuth", res.isAuth);
   return res;
  } catch (error) {
    

    throw error.response.data.error || "Something Went Wrong";
  }
};


const getRefreshToken = async (value) => {
  try {
    const res = await apiUtils.postWithToken(authEndPoints.login,{});

    setItemInLocal("refreshToken", res.data.refreshToken);

    return res.data.refreshToken;
  } catch (error) {
    

    throw error.response.data.error || "Something Went Wrong";
  }
};



export { postSingUp, postLogin, postLogout, getAuthUser, getRefreshToken };