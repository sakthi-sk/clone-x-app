import React, { useState } from 'react'
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { FollowButtonMui } from "../muiComponents/buttonMui";
import { NavLink } from 'react-router-dom';
import { getItemInSession } from '../../hooks/StorageLocal';
import { followUnFollowPost } from '../../Services/users';
import { useMutation } from '@tanstack/react-query';
import { Divider } from '@mui/material';
import ButtonLoader from '../loder/ButtonLoader';

const FollowSuggestionUserCard = ({ img, name, userName, userId}) => {
  const authUserInfo = getItemInSession("auth");
  const value = authUserInfo.following.includes(userId);
  const [isFollowing, setIsFollowing] = useState(value);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: followUnFollowPost,
    onSuccess: () => {
      setIsFollowing((prv) => !prv);
    },
  });

  const followUnFollowSubmit = (userFoll0wId) => {
     if (isPending)  return ;
     mutate(userFoll0wId);
  };

  
  
  return (
    <>
      <List>
        <ListItem
          sx={{ width: "100%", minWidth: "300px" }}
          secondaryAction={
            <IconButton edge="end" aria-label="follow">
              <FollowButtonMui
                value={isFollowing}
                onClick={() => followUnFollowSubmit(userId)}
              >
                {isFollowing ? "following" : "follow"}
              </FollowButtonMui>
            </IconButton>
          }
        >
          <ListItemAvatar>
            <NavLink to={`/profile/${userName}`}>
              <Avatar alt={"profile"} src={img} />
            </NavLink>
          </ListItemAvatar>
          <ListItemText
            sx={{
              "& .MuiTypography-root": { color: "#fff" },
              "& .MuiTypography-body2": { color: "#888", fontSize: "0.9rem" },
            }}
            primary={name}
            secondary={userName}
          />
        </ListItem>
      </List>
      <hr style={{ border: "1px solid #2F3336" }} />
    </>
  );
};

export default FollowSuggestionUserCard
