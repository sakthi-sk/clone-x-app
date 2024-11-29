//const BASE_URL = "http://localhost:8000/api/";

const BASE_URL = "https://clone-x-app.onrender.com/api/";
 export const authEndPoints = {
  signup: `${BASE_URL}auth/signup`,
  login: `${BASE_URL}auth/login`,
  logout: `${BASE_URL}auth/logout`,
  getMe: `${BASE_URL}auth/me`,
};
export const postEndPoints = {
  newPost: `${BASE_URL}posts/create`,
  allPost: `${BASE_URL}posts/all`,
  followingPost: `${BASE_URL}posts/following`,
  userPost: `${BASE_URL}posts/user`,
  comment: `${BASE_URL}posts/comment`,
  likeUnlike: `${BASE_URL}posts/like`,
  likePost: `${BASE_URL}posts/likes`,
  delete: `${BASE_URL}posts`,
  notification: `${BASE_URL}notifications`,
  commentGet: `${BASE_URL}posts/comment`,
};

export const user = {
  suggested: `${BASE_URL}user/suggested`,
  ProfileUser: `${BASE_URL}user/profile`,
  updateUser: `${BASE_URL}user/update`,
  followUnFollow: `${BASE_URL}user/follow`,
 
};
