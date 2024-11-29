import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import React from 'react'
import { NavLink } from 'react-router-dom';

const UserProfileCard = ({userName,img,content,id ,}) => {
  return (
    <List sx={{ width: "100%" }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <NavLink to={`/profile/${userName}`}>
            <Avatar alt="profile" src={img} />
          </NavLink>
        </ListItemAvatar>
        <ListItemText
          primary={userName}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                sx={{
                  color: "var(--comment-text-color)",
                  fontSize: "0.8rem",
                  display: "inline",
                }} // Secondary text part (Ali Connors)
              >
                {content === "like" && <>{userName} Like your post</>}
                {content === "like" && <>{userName}  started follow you</>}
              </Typography>
            </React.Fragment>
          }
          sx={{
            "& .MuiListItemText-primary": {
              color: "#E1E3E4", // Primary text color
              fontSize: "0.9rem", // Primary text font size
              fontWeight: "bold", // Optional: Make it bold
            },
          }}
        />
      </ListItem>
      <Divider
        sx={{ border: "1px solid #2F3336" }}
        variant="inset"
        component="li"
      />
      {/* userComments end */}
    </List>
  );
}

export default UserProfileCard
