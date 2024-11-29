
import Box from "@mui/material/Box";
import FollowSuggestionUserCard from "./FollowSuggestionUserCard";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSuggestedUserList } from "../../Services/users";
import { getItemInSession } from "../../hooks/StorageLocal";
import CardLoader from "../loder/CardLoader";


const FollowSuggestionCard = () => {
  const authUserInfo = getItemInSession("auth");

   const [suggestedUser, setSuggestedUser] = useState([]);


   const { data: SuggestedList, isLoading,isError } = useQuery({
     queryKey: ["suggestedUser"],
     queryFn: getSuggestedUserList,
   });

   useMemo(() => {
     if (SuggestedList) {
       setSuggestedUser(SuggestedList);
     }
   }, [SuggestedList]);

  


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

    if (!SuggestedList || SuggestedList.length === 0) {
      return (
        <p style={{ color: "#71767B", textAlign: "center" }}>
          No SuggestedUser available.
        </p>
      );
    } 
 
     

  return (
    <Box
      sx={{
        marginTop: 1,
        border: "1px solid #222527",
        borderRadius: "8px",
        minHeight: "300px",
        maxHeight: "100%",
        overflowX: "auto",
      }}
    >
      {suggestedUser?.map(({ username, name, profileImg, _id: userId }, i) => (
        <div key={i}>
          <FollowSuggestionUserCard
            name={name}
            img={profileImg}
            userName={username}
            userId={userId}
           
          />
        </div>
      ))}
    </Box>
  );
};

export default FollowSuggestionCard;
