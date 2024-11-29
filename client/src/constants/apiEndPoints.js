//const BASE_URL = "http://localhost:8000/api/";

const BASE_URL = "https://clone-x-app.onrender.com";
 export const authEndPoints = {
   signup: `${BASE_URL}/api/auth/signup`,
   login: `${BASE_URL}/api/auth/login`,
   logout: `${BASE_URL}/api/auth/logout`,
   getMe: `${BASE_URL}/api/auth/me`,
 };
export const postEndPoints = {
  newPost: `${BASE_URL}/api/posts/create`,
  allPost: `${BASE_URL}/api/posts/all`,
  followingPost: `${BASE_URL}/api/posts/following`,
  userPost: `${BASE_URL}/api/posts/user`,
  comment: `${BASE_URL}/api/posts/comment`,
  likeUnlike: `${BASE_URL}/api/posts/like`,
  likePost: `${BASE_URL}/api/posts/likes`,
  delete: `${BASE_URL}/api/posts`,
  notification: `${BASE_URL}/api/notifications`,
  commentGet: `${BASE_URL}/api/posts/comment`,
};

export const user = {
  suggested: `${BASE_URL}user/suggested`,
  ProfileUser: `${BASE_URL}user/profile`,
  updateUser: `${BASE_URL}user/update`,
  followUnFollow: `${BASE_URL}user/follow`,
 
};
