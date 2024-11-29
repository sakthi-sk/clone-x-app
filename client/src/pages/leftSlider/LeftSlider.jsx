import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

import { NavLink } from "react-router-dom";
import { EmailIcon, EmailOutlinedIcon, HomeIcon, HomeOutlinedIcon, LogoutIcon, NotificationsIcon, NotificationsNoneOutlinedIcon, PermIdentityOutlinedIcon, PersonIcon } from "../../muiIcons";
import React from "react";
import { Stack, Typography } from "@mui/material";


import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { ButtonMui } from "../../components/muiComponents/buttonMui";
import { useMutation } from "@tanstack/react-query";
import { postLogout } from "../../Services/auth";
import { getItemInSession } from "../../hooks/StorageLocal";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";

const LeftSlider = ({ enable }) => {


   const { mutate:logOut, isPending, isError, error } = useMutation({
     mutationFn:postLogout,
     onSuccess: () => {
      window.location.reload()
       
     },
   });

  const { name, username, profileImg } = getItemInSession("auth")
   
   

   const navigateLinkList = [
     {
       name: "Home",
       path: "home",
       activeIcon: <HomeIcon />,
       defaultIcon: <HomeOutlinedIcon />,
     },
     {
       name: "Notification",
       path: "notification",
       activeIcon: <NotificationsIcon />,
       defaultIcon: <NotificationsNoneOutlinedIcon />,
     },
    //  {
    //    name: "Messages",
    //    path: "messages",
    //    activeIcon: <EmailIcon />,
    //    defaultIcon: <EmailOutlinedIcon />,
    //  },
     {
       name: "Profile",
       path: `profile/${username}`,
       activeIcon: <PersonIcon />,
       defaultIcon: <PermIdentityOutlinedIcon />,
     },
   ];


   

   
   
  return (
    <>
      <Stack
        direction={"column"}
        sx={{
          display: { xs: "none", sm: "flex", md: "flex" },
          flexGrow: { xs: "0", sm: "0", md: "1" },
          flexBasis: "3%",
          p: 1,
          justifyContent:"space-between",
          overflowY: "auto",
          overflowX: "hidden",
          minWidth: "60px",
          transition: "all 0.3s ease-in-out",
          
        }}
      >
        <Box sx={{ width: "100%", maiWidth: 360 }}>
          <p>logo</p>
          <nav>
            <List>
              {navigateLinkList.map(
                ({ name, path, activeIcon, defaultIcon }, i) => (
                  <ListItem disablePadding key={i}>
                    <ListItemButton component={NavLink} to={path}>
                      <ListItemIcon>
                        {React.cloneElement(activeIcon, { fontSize: "medium" })}

                        {/* Icon size */}
                      </ListItemIcon>
                      <ListItemText
                        primary={name}
                        sx={{ "& .MuiTypography-root": { fontSize: "1.2rem" } }}
                      />
                    </ListItemButton>
                  </ListItem>
                )
              )}
            </List>
          </nav>
          <Divider />
        </Box>

        <Box>
          <Box>
            <ButtonMui
              style={{ width: "100%" }}
              onClick={() => enable((prv) => !prv)}
            >
              Post
            </ButtonMui>
          </Box>
          <List sx={{ width: "100%", maxWidth: 360 }}>
            <ListItem>
              <ListItemAvatar
                sx={{ display: { xs: "none", sm: "none", md: "block" } }}
              >
                <Avatar alt="profile Img" src={profileImg} />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  display: { xs: "none", sm: "none", md: "block" },
                  "& .MuiTypography-root": { color: "#fff" },
                  "& .MuiTypography-body2": {
                    color: "#888",
                    fontSize: "0.9rem",
                  },
                }}
                primary={username}
                secondary={name}
              />
              <LogoutIcon
                onClick={(e) => {
                  e.preventDefault();
                  logOut();
                }}
              />
            </ListItem>
          </List>
        </Box>
      </Stack>

      <Stack
        direction="row"
        sx={{
          display: { xs: "flex", sm: "none", md: "none" },
          width: "99%",
          background: "var(--bod-background-color)",
          //border: "1px solid #333639",
          zIndex: "9",
          overflowX: "auto",
          position: "absolute",
          left: "0",
          bottom: "0",
        }}
      >
        {navigateLinkList.map(({ name, path, defaultIcon }, i) => (
          <>
            <NavLink className="userInfoLink" key={i} to={path}>
              {({ isActive }) => (
                <Typography
                  sx={{
                    color: "#71767B",
                    borderBottom: isActive ? "4px solid #1D9BF0" : "",
                    width: "fit-content",
                    // margin: "auto",
                    padding: "5px",
                  }}
                >
                  {React.cloneElement(defaultIcon, { fontSize: "medium" })}
                </Typography>
              )}
            </NavLink>
          </>
        ))}
        <AddToPhotosIcon
          sx={{
            marginTop: "10px",
            marginRight: { xs: "40px", sm: "50px", md: "90px" },
          }}
          onClick={() => enable((prv) => !prv)}
        />

        <LogoutIcon
          sx={{ marginTop: "10px", marginRight: "20px" }}
          onClick={(e) => {
            e.preventDefault();
            logOut();
          }}
        />
      </Stack>
    </>
  );
};

export default LeftSlider;
