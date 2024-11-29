import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ChatOutlinedIcon, DeleteOutlineOutlinedIcon, } from "../../muiIcons";
import FavoriteIconImg from "../../image/lover.png";
import { useRef, useState } from "react";
import Comment from "./Comment";
import {NavLink} from "react-router-dom"
import DateFns from "../dateFns/DateFns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { likeUnLikePost, deletePosts, commentGet } from "../../Services/post";
import { getItemInSession } from "../../hooks/StorageLocal";
import LinearIndeterminate from "../loder/LinearIndeterminate";






const PostCard = ({ comment, text, user, likes, id, updatedAt,Img }) => {
  const authUserInfo = getItemInSession("auth");
  const [expanded, setExpanded] = useState(false);
  const commentRef = useRef(null);

  const myLikePost = likes?.includes(authUserInfo?._id);
  const [likePostShowUi, setLikePostShowUi] = useState(myLikePost);
  const [likePostCountUi, setLikePostCountUi] = useState(0);
  const [commentsList, setCommentsList] = useState([]);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: likeUnLikePost,
    onSuccess: () => {
      setLikePostShowUi((prv) => !prv);
      setLikePostCountUi((prv) => (prv === 0 ? ++prv : 0));
    },
  });

  const likeUnlikeSubmit = (id) => {
    mutate(id);
  };

  const queryClient = useQueryClient();

  const {
    mutate: deletePostFs,
    isPending: isDeleteLod,
    isError: isDeleteError,
    error: DeleteError,
  } = useMutation({
    mutationFn: deletePosts,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["UserPOstList"],
      });
      queryClient.invalidateQueries({
        queryKey: ["userPostsAll"],
      });
    },
  });

  const deleteSubmit = (id) => {
    deletePostFs(id);
  };

  const {
    mutate: getCommentList,
    isLoading: isLoadingComment,
    isError: isErrorCooment,
  } = useMutation({
    mutationFn: commentGet,
    onSuccess: (data) => {
      setCommentsList(data);
      console.log(commentsList, "commentsList");
    },
  });

  
  

  const handleExpandClick = (commentId) => {
    setExpanded((prev) => {
      if (!prev) {
        // If expanding, scroll to the CardContent
        setTimeout(() => {
          commentRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 300); // Wait for the collapse animation to complete
      }
      if (!prev) getCommentList(commentId);
      return !prev;
    });
  };

  return (
    <Card
      sx={{
        width: "95%",
        margin: " 20px auto ",
        borderBottom: "1px solid #2F3336",
        backgroundColor: "#1E1E1E",
        color: "#FFFFFF",
      }}
    >
      {isPending && <LinearIndeterminate />}

      {isDeleteLod && <LinearIndeterminate />}

      <CardHeader
        avatar={
          <Avatar
            component={NavLink}
            to={`/profile/${user?.username}`}
            src={user?.profileImg || null}
            aria-label="posts"
          />
        }
        action={
          <IconButton aria-label="settings">
            {user?._id === authUserInfo._id && (
              <DeleteOutlineOutlinedIcon onClick={() => deleteSubmit(id)} />
            )}
          </IconButton>
        }
        sx={{ color: "#FFFFFF" }}
        title={user?.username}
        subheader={
          updatedAt ? <DateFns date={updatedAt} username={user?.name} /> : ""
        }
        subheaderTypographyProps={{
          sx: { color: "#B0BEC5" },
        }}
      />
      {Img && (
        <CardMedia
          component="img"
          height="194"
          image={Img}
          alt="Paella dish"
          sx={{
            height: "100%",
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
        <Typography variant="body2" sx={{ color: "#FFFf" }}>
          {text || ""}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          {likePostShowUi ? (
            <div onClick={() => likeUnlikeSubmit(id)}>
              <img src={FavoriteIconImg} style={{ width: "30px" }} alt="" />
            </div>
          ) : (
            <FavoriteIcon
              style={{ color: "red" }}
              onClick={() => likeUnlikeSubmit(id)}
            />
          )}

          <span style={{ fontSize: "10px" }}>
            {likes?.length + likePostCountUi}
          </span>
        </IconButton>

        <CustomIconButton
          expand={expanded}
          onClick={() => handleExpandClick(id)}
        >
          <ChatOutlinedIcon />
          <span style={{ fontSize: "10px" }}>{comment?.length}</span>
        </CustomIconButton>
      </CardActions>
      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit
        sx={{
          border: "1px solid #2F3336",
        }}
      >
        <CardContent
          ref={commentRef}
          sx={{
            margin: "auto",
            minHeight: "300px",
            maxHeight: "400px",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <Comment
            comment={commentsList}
            postId={id}
            isLoading={isLoadingComment}
            reFetch={getCommentList}
            isErrorComment={isErrorCooment}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
};


const CustomIconButton = ({ expand, ...props }) => {
  // Use `expand` only within your component logic
  return <IconButton {...props} />;
};
export default PostCard;
