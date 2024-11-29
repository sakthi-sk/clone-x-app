import './Profile.css'
import { Avatar, Box, CardMedia, Stack, } from "@mui/material";

import { ButtonMui, EditButtonMui, FollowButtonMui } from "../../../components/muiComponents/buttonMui";
import Header from '../../../components/homeHeader/Header';
import { Outlet, useParams } from 'react-router-dom';
import { CloseIcon, PhotoCameraOutlinedIcon } from '../../../muiIcons';
import { TextFieldMui } from '../../../components/muiComponents/inputMui';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProfileUserList, updateUser } from '../../../Services/users';
import { getItemInSession } from '../../../hooks/StorageLocal';
import ProfileLoader from '../../../components/loder/ProfileLoader';
import LinearIndeterminate from '../../../components/loder/LinearIndeterminate';



const linkTag = [
  { name: "Post", path: "post" },
  { name: "Followers", path: "followers" },
  { name: "Following", path: "following" },
  { name: "Likes", path: "likes" },
];


const Profile = () => {

  const authUserInfo=getItemInSession("auth")

 const [editProfileView, setEditProfileView] = useState(false);
 const { id } = useParams();


  const {
    data: UserProfile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["UserProfileInfo"],
    queryFn: () => getProfileUserList(id),
    refetchOnWindowFocus: false,
  });

 
     if (isLoading) {
       return (
         <>
           <ProfileLoader/>
         </>
       );
     }

     if (isError) {
       return (
         <p style={{ color: "#71767B", textAlign: "center" }}>
           Failed to load Profile. Please try again.
         </p>
       );
     }

    


 const userFollowingList = UserProfile?.followers?.find(
   (item) => item._id === authUserInfo._id
 );

return (
    <Box sx={{ height: "100%", overflowX: "hidden" }}>
      <Box
        sx={{
          height: "35%",
          position: "relative",
          background: "#333639",
        }}
      >
        <CardMedia
          component="img"
          height="100%"
          image={UserProfile?.coverImg}
          alt="coverImg"
        />

        <Stack
          direction="row"
          sx={{
            position: "absolute",
            bottom: "-25%",
            // border: "1px solid red",
            width: "93%",
            alignItems: "end",
            justifyContent: "space-between",
            padding: "0px 20px",
            rowGap: "20px",
            flexWrap: "wrap",
          }}
        >
          <Avatar
            alt="profile"
            src={UserProfile?.profileImg}
            sx={{
              width: { xs: 80, sm: 100, md: 120 },
              height: { xs: 80, sm: 100, md: 120 },
            }}
          />

          {authUserInfo?._id === UserProfile?._id ? (
            <EditButtonMui onClick={() => setEditProfileView(!editProfileView)}>
              Edit profile
            </EditButtonMui>
          ) : (
            <FollowButtonMui
              value={userFollowingList?._id === authUserInfo?._id ? true : false}
              onClick={() => setEditProfileView(!editProfileView)}
            >
              {userFollowingList?._id === authUserInfo?._id ? "following" : "follow"}
            </FollowButtonMui>
          )}
        </Stack>

        <Box className="userInfo" sx={{ marginTop: "80px" }}>
          <h2>{UserProfile?.name}</h2>
          <p>{UserProfile?.username}</p>
          <p>{UserProfile?.bio}</p>
        </Box>

        <Box sx={{ position: "sticky", top: "-10px" }}>
          <Header linkTag={linkTag} />
          <Outlet />
        </Box>
      </Box>
      {editProfileView && (
        <EditProfile
          enable={editProfileView}
          disable={setEditProfileView}
          UserProfile={UserProfile}
        />
      )}
    </Box>
  );
};


const EditProfile = ({ enable, disable, UserProfile }) => {
  const [Editvalue, setEditValue] = useState({
    name: UserProfile?.name,
    username: UserProfile?.username,
    profileImg: UserProfile?.profileImg,
    coverImg: UserProfile?.coverImg,
    bio: UserProfile?.bio,
  });

 const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
       queryKey: ["authUser"],
       
      });
       queryClient.invalidateQueries({
        queryKey: ["UserProfileInfo"],
       });
       disable((prv) => !prv);
     
    },
    onError:()=>{
       console.log(error);
       
    }
  });


   const handelOnChang = (e) => {
     const { name, value } = e.target;
    
     
     
     if (e.target.type === "file" && name === "profileImg") {
       getPostImgInLocal(e, name);
     } else if (e.target.type === "file" && name === "coverImg") {
       getPostImgInLocal(e, name);
     } else {
       setEditValue((prev) => ({ ...prev, [name]: value }));
     }
   };


  const handelSubmit = (e) => {
    e.preventDefault();
    mutate(Editvalue);
   
  };

  
  const getPostImgInLocal = (e,name) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditValue((prev) => ({
          ...prev,
          [name]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
    
  };




  
   

    






  return (
    <Box
      sx={{
        height: "100%",
        position: "absolute",
        width: "100%",
        left: "0",
        top: "0",
        background: "var(--background-cover)",
        zIndex: "8",
        display: "flex",
        // alignItems:"center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          height: "90%",
          minHeight: "50%",
          maxHeight: "900px",
          width: { xs: "95%", sm: "40%", md: "40%" },
          minWidth: "300px",
          maxWidth: "600px",
          background: "black",
          marginTop: "20px",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        {isPending && <LinearIndeterminate />}

        <Stack
          direction={"row"}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            width: "97%",
            margin: " auto",
            background: "black",
            p: 1,
          }}
        >
          <CloseIcon onClick={() => disable(!enable)} />
          {isError && (
            <p style={{ color: "#71767B", textAlign: "center" }}>
              Failed Please try again.
            </p>
          )}
          <ButtonMui value={isPending} onClick={handelSubmit}>
            save
          </ButtonMui>
        </Stack>

        <Box
          sx={{
            height: "40%",
            width: "100%",
            background: "#333639",
            overflow: "hidden",
            margin: "auto",
            position: "relative",
          }}
        >
          <CardMedia
            component="img"
            height="100%"
            image={Editvalue?.coverImg}
            alt="coverImg"
          />

          <input
            id="upload-cover-img"
            type="file"
            name="coverImg"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handelOnChang}
          />
          <label
            htmlFor="upload-cover-img"
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "35%",
              left: "50%",
            }}
          >
            <PhotoCameraOutlinedIcon />
          </label>
        </Box>

        <Stack
          direction="row"
          sx={{
            position: "absolute",
            top: "35%",
            // border: "1px solid red",
            // width: "93%",
            alignItems: "end",
            justifyContent: "space-between",
            padding: "0px 20px",
            rowGap: "20px",
            flexWrap: "wrap",
          }}
        >
          <Avatar
            alt="profile"
            src={Editvalue?.profileImg}
            sx={{
              width: { xs: 80, sm: 100, md: 120 },
              height: { xs: 80, sm: 100, md: 120 },
            }}
          />
          <input
            id="upload-img"
            type="file"
            name="profileImg"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handelOnChang}
          />
          <label htmlFor="upload-img" style={{ cursor: "pointer" }}>
            <PhotoCameraOutlinedIcon />
          </label>
        </Stack>

        <Box sx={{ marginTop: "50px" }}>
          <form
            onSubmit={handelSubmit}
            style={{
              display: "flex",
              gap: "10px",
              flexDirection: "column",
              width: "95%",
              margin: "auto",
            }}
          >
            <TextFieldMui
              value={Editvalue.name}
              placeholder={"Name"}
              onChange={handelOnChang}
              name={"name"}
            />
            <TextFieldMui
              value={Editvalue.username}
              placeholder={"UserName"}
              onChange={handelOnChang}
              name={"username"}
            />
            <TextFieldMui
              value={Editvalue.bio}
              placeholder={"bio"}
              onChange={handelOnChang}
              name={"bio"}
            />
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
