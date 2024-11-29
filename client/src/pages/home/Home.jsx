import Box from "@mui/material/Box";
import React from "react";
import Header from "../../components/homeHeader/Header";
import { Outlet } from "react-router-dom";

const linkTag = [
  { name: "ForYou", path: "/home/foryou" },
  { name: "Following", path: "/home/following" },
];

const Home = () => {
  return (
    <Box>
      <Header linkTag={linkTag} />
      <Outlet />
    </Box>
  );
};

export default Home;
