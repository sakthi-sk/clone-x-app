import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Boy from "../../image/image.png";
import { Box, Stack } from "@mui/material";
import { CommentFieldMui, } from "../../components/muiComponents/inputMui";
import { CloseIcon, EmojiEmotionsOutlinedIcon, ImageIcon } from "../../muiIcons";
import { EditButtonMui } from "../../components/muiComponents/buttonMui";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newPost } from "../../Services/post";
import LinearIndeterminate from "../../components/loder/LinearIndeterminate";
import { getItemInSession } from "../../hooks/StorageLocal";

const Post = ({ enable }) => {

 const aunthUserInfo=getItemInSession("auth")

  const [userPost, setUserPost] = useState({
    postComment: "",
    postImg: "",
  });

  const queryClient=useQueryClient()



   const { mutate, isPending, isError } = useMutation({
     mutationFn: newPost,
     onSuccess: () => {
       setUserPost({
         postComment: "",
         postImg: "",
       });
       enable((prv) => !prv);

       queryClient.invalidateQueries({
         queryKey: ["userPostsAll"],
       });
       console.log(" new post Success ");
     },
   });

  const handelOnChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === "file") {
      getPostImgInLocal(e);
    } else {
      setUserPost((prev) => ({ ...prev, [name]: value }));
    }
  };

  const getPostImgInLocal = (e) => {
    const file = e.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUserPost((prev) => ({
          ...prev,
          postImg: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
    console.log(userPost.postImg, "post img");
  };


  const handelSubmitNewPost=(e)=>{
     e.preventDefault();
      mutate({ text: userPost.postComment, img: userPost.postImg });
    
     
  }

  return (
    <Box
      sx={{
        position: "absolute",

        width: "100%",
        height: "100%",

        background: "var(--background-cover)",
        zIndex: "5",
        display: "flex",

        justifyContent: "center",
        left: "0",
      }}
    >
      <Card
        sx={{
          width: { xs: "95%", sm: "50%", md: "40%" },
          minWidth: "300px",
          maxWidth: "700px",
          minHeight: "100px",
          maxHeight: "700px",
          height: {
            xs: userPost.postImg ? "75%" : "25%",
            sm: userPost.postImg ? "75%" : "25%",
            md: userPost.postImg ? "75%" : "25%",
          },
          backgroundColor: "#1E1E1E",
          color: "#FFFFFF",
          transition: "all 0.3s ease-in-out",
          marginTop: "30px",
        }}
      >
        {isPending && <LinearIndeterminate />}

        <CardHeader
          avatar={<Avatar src={aunthUserInfo?.profileImg} aria-label="posts" />}
          action={
            <IconButton aria-label="settings">
              <CloseIcon onClick={() => enable((prv) => !prv)} />
            </IconButton>
          }
          sx={{ color: "#FFFFFF" }}
          title={aunthUserInfo?.username}
          subheader={aunthUserInfo?.name}
          subheaderTypographyProps={{
            sx: { color: "#B0BEC5" },
          }}
        />
        {!isError && (
          <>
            {userPost.postImg && (
              <CardMedia
                component="img"
                image={userPost.postImg}
                alt="Paella dish"
                sx={{
                  height: "fit-content%",
                  maxHeight: "65%",
                  width: "90%",
                  margin: "auto",
                  objectFit: "cover",
                  objectPosition: "center",
                  border: "1px solid #2F3336",
                  borderRadius: "20px",
                }}
              />
            )}

            <CardContent>
              <form onSubmit={handelSubmitNewPost}>
                <Stack
                  direction={"row"}
                  gap={"10px"}
                  p={1}
                  alignItems={"center"}
                >
                  <input
                    id="upload-img"
                    type="file"
                    name="postImg"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handelOnChange}
                  />
                  <label htmlFor="upload-img" style={{ cursor: "pointer" }}>
                    <ImageIcon />
                  </label>
                  <CommentFieldMui
                    value={userPost.postComment}
                    name={"postComment"}
                    icon={<EmojiEmotionsOutlinedIcon />}
                    onChange={handelOnChange}
                  />

                  <EditButtonMui
                    disabled={
                      (!isPending && userPost.postComment) || userPost.postImg
                        ? false
                        : true
                    }
                    onClick={handelSubmitNewPost}
                  >
                    post
                  </EditButtonMui>
                </Stack>
              </form>
            </CardContent>
          </>
        )}

        {isError && (
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "gray" }}>Try again</p>
          </div>
        )}
      </Card>
    </Box>
  );
};

export default Post;
