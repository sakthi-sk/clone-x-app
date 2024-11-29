import React from 'react'
import Auth from '../pages/auth/Auth';
import LayOut from '../view/LayOut/LayOut';
import { Navigate } from 'react-router-dom';
import Home from '../pages/home/Home';
import Following from '../pages/home/Following';
import ForYou from '../pages/home/ForYou';
import Profile from '../pages/userInfo/profile/Profile';
import Notification from '../pages/notification/Notification';
import UserPost from '../pages/userInfo/userPost/UserPost';
import UserFollowersList from '../pages/userInfo/UserFollowersList/UserFollowersList';
import UserFollowList from '../pages/userInfo/UserFollowList/UserFollowList';
import UserLikeList from '../pages/userInfo/userLikeList/UserLikeList';

const Routes = () => {
     const publicRoutes = [
        {path:"login",element:<Auth/>}
     ]
     const privateRoutes = [
       {
         path: "/",
         element: <LayOut />,
         children: [
           { path: "", element: <Navigate to={"home"} /> },
           {
             path: "home",
             element: <Home />,
             children: [
               { path: "", element: <Navigate to={"foryou"} /> },
               { path: "foryou", element: <ForYou /> },
               { path: "following", element: <Following /> },
             ],
           },
           { path: "notification", element: <Notification /> },
           { path: "messages", element: <p>message</p> },
           {
             path: "profile/:id",
             element: <Profile />,
             children: [
               { path: "", element: <Navigate to={"post"} /> },
               { path: "post", element: <UserPost /> },
               { path: "followers", element: <UserFollowersList /> },
               { path: "following", element: <UserFollowList /> },
               { path: "likes", element: <UserLikeList /> },
             ],
           },
         ],
       },
       
     ];

     return { publicRoutes, privateRoutes };

}

export default Routes
