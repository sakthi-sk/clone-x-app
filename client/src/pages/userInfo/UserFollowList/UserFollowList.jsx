import React, { useEffect, useState } from 'react'
import FollowSuggestionUserCard from '../../../components/followSuggestion/FollowSuggestionUserCard';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getItemInSession } from '../../../hooks/StorageLocal';
import CardLoader from '../../../components/loder/CardLoader';

const UserFollowList = () => {
  const [userFollowingList,setUserFollowingList]=useState([])

  const authUserInfo=getItemInSession("auth")

  
    const {
      data: FollowList,
      isLoading,
      isError,
    } = useQuery({
      queryKey: ["UserProfileInfo"],
    });

    useEffect(() => {
      if (FollowList) {
        setUserFollowingList(FollowList?.following);
      }
    }, [FollowList]);

    ;
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
           Failed to load FollowingList. Please try again.
         </p>
       );
     }

     if (!FollowList || FollowList.length === 0) {
       return (
         <p style={{ color: "#71767B", textAlign: "center" }}>
           No FollowingList available.
         </p>
       );
     } 



  return (
    <>
      {userFollowingList?.map(({ name, username, _id, profileImg }) => (
        <div>
          <FollowSuggestionUserCard
            name={name}
            userId={_id}
            userName={username}
            img={profileImg}
          />
        </div>
      ))}
    </>
  );
}

export default UserFollowList
