import { Box } from '@mui/material';
import React from 'react'
import UserProfileCard from '../../components/userProflieCard/UserProfileCard';
import {  useQuery } from '@tanstack/react-query';
import { getNotification } from '../../Services/post';
import { getItemInSession } from '../../hooks/StorageLocal';
import CardLoader from '../../components/loder/CardLoader';


const Notification = () => {
  const authUserInfo=getItemInSession("auth")
  const { data, isLoading, isError } = useQuery({
    queryKey: ["UserNotification"],
    queryFn: getNotification,
  });

  const Notificationlist= data?.filter((item) => item.to === authUserInfo?._id)
 

  
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

    if (!data || data.length === 0) {
      return (
        <p style={{ color: "#71767B", textAlign: "center" }}>
          No SuggestedUser available.
        </p>
      );
    } 
  

  return (
    <Box sx={{ height: "100%", overflow: "auto" }}>
      {Notificationlist.map((item, i) => (
        <div key={i}>
          <UserProfileCard
            userName={item.from.username}
            img={item.from.profileImg}
            content={item.type}
          />
        </div>
      ))}
    </Box>
  );
}

export default Notification
