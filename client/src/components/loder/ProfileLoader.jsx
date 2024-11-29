import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export default function ProfileLoader() {
  return (
    <Box
      sx={{
        bgcolor: "#121212",
       width: "100%",
       display: "flex",
       justifyContent: "center",

      }}
    >
      <Skeleton
        sx={{ bgcolor: "grey.900" ,margin:"auto"}}
        variant="rectangular"
        width={"100%"}
        height={400}
        
      />
    </Box>
  );
}
