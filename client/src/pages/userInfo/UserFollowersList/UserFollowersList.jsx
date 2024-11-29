import React, { useEffect, useState } from 'react'
import FollowSuggestionUserCard from '../../../components/followSuggestion/FollowSuggestionUserCard';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getItemInSession } from '../../../hooks/StorageLocal';
import CardLoader from '../../../components/loder/CardLoader';

const UserFollowersList = () => {

  const [userFollowersList,setUserFollowerList]=useState([])

  const authUserInfo = getItemInSession("auth");
   const {
     data: UserFollowers,
     isLoading,
     isError,
   } = useQuery({
     queryKey: ["UserProfileInfo"],
   });

   useEffect(() => {
     if (UserFollowers) {
       setUserFollowerList(UserFollowers?.followers);
     }
   }, [UserFollowers]);

    if (isLoading) {
      return (
        <>
          <CardLoader />
        </>
      );
    }

    if (isError) {
      return (
        <p style={{ color: "#71767B", textAlign: "center" }}>
          Failed to load Followers List. Please try again.
        </p>
      );
    }

    if (!UserFollowers || UserFollowers.length === 0) {
      return (
        <p style={{ color: "#71767B", textAlign: "center" }}>
          No Followers available.
        </p>
      );
    } 



   
   

  return (
    <>
      {userFollowersList.map(({ name, username, _id: userId, profileImg }) => (
        <div>
          <FollowSuggestionUserCard
            name={name}
            userId={userId}
            userName={username}
            img={profileImg}
            value={authUserInfo.following.includes(UserFollowers?._id)}
          />
        </div>
      ))}
    </>
  );
}

export default UserFollowersList
