import { Avatar, Box, Stack } from '@mui/material'
import React, { useState } from 'react'
import { CommentFieldMui } from '../muiComponents/inputMui';
import { EmojiEmotionsOutlinedIcon, SendIcon } from '../../muiIcons';
import UserProfileCard from '../userProflieCard/UserProfileCard';
import {  getItemInSession } from '../../hooks/StorageLocal';
import { useMutation } from '@tanstack/react-query';
import { commentPost } from '../../Services/post';
import ButtonLoader from '../loder/ButtonLoader';
import CardLoader from '../loder/CardLoader';

const Comment = ({ comment, postId, isLoading, reFetch, isErrorComment}) => {
  const authUserInfo = getItemInSession("auth");
  const [userComment, setUserComment] = useState("");

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: commentPost,
    onSuccess: () => {
      setUserComment("");
      reFetch(postId);
    },
  });

  const handelCommentSubmit = (e) => {
    e.preventDefault();
    mutate({ userComment, postId });
  };

  const noData = !comment || comment.length === 0;

  return (
    <Box>
      <Box
        sx={{
          position: "sticky",
          width: "103%",
          top: "-16px",
          marginLeft: "-13px",
          marginTop: "-20px",
          zIndex: "3",
          p: 1,
          background: "black",
        }}
      >
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Avatar alt="Profile" src={authUserInfo.profileImg} />
          <CommentFieldMui
            name={"userComment"}
            label={""}
            value={userComment}
            type={"text"}
            placeholder={"comment"}
            onChange={(e) => setUserComment(e.target.value)}
            icon={<EmojiEmotionsOutlinedIcon />}
          />
          {isPending ? (
            <ButtonLoader />
          ) : (
            <SendIcon onClick={handelCommentSubmit} />
          )}
        </Stack>
      </Box>

      {isLoading && <CardLoader />}
      {noData && (
        <p style={{ color: "#71767B", textAlign: "center" }}>
          No comment available.
        </p>
      )}

      {isErrorComment && (
        <p style={{ color: "#71767B", textAlign: "center" }}>
          try again
        </p>
      )}
      {!isLoading && (
        <>
          {comment?.map(({ text, user }, i) => (
            <div key={i}>
              <UserProfileCard
                userName={user?.username}
                img={""}
                content={text}
              />
            </div>
          ))}
        </>
      )}
    </Box>
  );
};

export default Comment
