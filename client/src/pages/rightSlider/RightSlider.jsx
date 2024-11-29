import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { SearchFieldMui } from '../../components/muiComponents/inputMui';
import { SearchIcon } from '../../muiIcons';
import FollowSuggestionCard from "../../components/followSuggestion/FollowSuggestionCard"
;

const RightSlider = () => {
 

  
  return (
    <Box
      sx={{display: { xs: "none", sm: "none", md: "block" }, p: 2,flex: 1,}}
    >
      <div className="search_bar">
        <SearchFieldMui
          name={"search"}
          placeholder={"search"}
          icon={<SearchIcon />}
        />
      </div>
      
      <Box className="follow_suggestion" height={"90%"}>
        <FollowSuggestionCard />
       
      </Box>
      
    </Box>
  );
}

export default RightSlider
