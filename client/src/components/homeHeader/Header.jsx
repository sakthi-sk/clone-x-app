

import {NavLink} from "react-router-dom"
import { Stack, Typography } from "@mui/material";



const Header = ({linkTag}) => {
     
  return (
    <>
      <Stack
        direction="row"
        sx={{
          width: "100%",
          borderBottom: "1px solid #333639",
          position: "sticky",
          top: "0",
          background: "var(--bod-background-color)",
          // border: "1px solid #333639",
          zIndex:"3",
          overflowY:"auto"
        }}
      >
        {linkTag.map(({ name, path }, i) => (
          <NavLink className="userInfoLink" key={i} to={path}>
            {({ isActive }) => (
              <Typography
                sx={{
                  color: "#71767B",
                  borderBottom: isActive ? "4px solid #1D9BF0" : "",
                  width: "fit-content",
                  margin: "auto",
                  padding: "10px",
                }}
              >
                {name}
              </Typography>
            )}
          </NavLink>
        ))}
      </Stack>
    </>
  );
};

export default Header;
