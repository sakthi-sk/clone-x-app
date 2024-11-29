import axios from "axios";
import { getItemInLocal, setItemInLocal } from "../hooks/StorageLocal";
import { getRefreshToken } from "../Services/auth";


 const refreshToken = getItemInLocal("refreshToken");



 axios.interceptors.response.use(
   (response) => response, // If the response is successful, just return it
  async (error) => {
    const originalRequest = error.config;
   
    
     if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
       try {
        const newRefreshToken = await getRefreshToken();
          setItemInLocal("refreshToken", newRefreshToken);
        return newRefreshToken;
       
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
 )










 export const apiUtils = {
   postLogout: async (url) => {
     try {
       const res = await axios.post(
         url,
         {},
         {
           headers: {
             "Content-Type": "application/json", // Specify JSON format
             Accept: "application/json", // Accept JSON responses
           },
           withCredentials: true, // Include cookies if needed
         }
       );

       return res.data;
     } catch (error) {
       throw error;
     }
   },
   postWithoutToken: async (url, data) => {
     try {
      

       const res = await axios.post(url, data, {
         headers: {
           "Content-Type": "application/json", // Specify JSON format
           Accept: "application/json", // Accept JSON responses
         },
         withCredentials: true, // Include cookies if needed
       });

       return res;
     } catch (error) {
       throw error;
     }
   },
   postWithToken: async (url, data) => {
     try {
       const res = await axios.post(url, data, {
         headers: {
           "Content-Type": "application/json",
           "refresh-token": refreshToken,
         },
         withCredentials: true, // Include cookies if needed
       });

       return res.data;
     } catch (error) {
       throw error;
     }
   },

   getWithToken: async (url) => {
     try {
       const res = await axios.get(url, {
         headers: {
           "Content-Type": "application/json",
           "refresh-token": refreshToken,
         },
         withCredentials: true, // Include cookies if needed
       });
      
       return res.data;
     } catch (error) {
       throw error;
     }
   },

   deleteWithToken: async (url) => {
     try {
       const res = await axios.delete(url,{
         headers: {
           "Content-Type": "application/json",
           "refresh-token": refreshToken,
         },
         withCredentials: true, // Include cookies if needed
       });
      
       return res.data;
     } catch (error) {
       throw error;
     }
   },
 };