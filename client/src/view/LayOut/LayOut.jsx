
import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import LeftSlider from "../../pages/leftSlider/LeftSlider";
import RightSlider from "../../pages/rightSlider/RightSlider";
import Post from "../../pages/post/Post";
import { useState } from "react";

const LayOut = () => {

  const [postTapEnable,setPostTapEnable]=useState(false)
  return (
    <Stack
      direction={"row"}
      sx={{
        height: "100%",
        width: "95%",
        maxWidth: "1300px",
        // minWidth: "1000px",
        margin: "auto",
      }}
    >
      <LeftSlider enable={setPostTapEnable} />
      <Box
        sx={{
          flexGrow: { xs: 1, sm: 0.6, md: 1 },
          flexBasis: "30%",
          border: "1px solid #2F3336",
          overflow: "auto",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Outlet />
      </Box>

      <RightSlider />
      {postTapEnable && <Post enable={setPostTapEnable} />}
    </Stack>
  );
};

export default LayOut;
