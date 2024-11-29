import { formatDistanceToNow, parseISO } from "date-fns";
import React from 'react'

 const DateFns = ({ date, username }) => {
   // Get the relative time (e.g., "2 days ago")
   const relativeTime = formatDistanceToNow(date, { addSuffix: true });
   return (
     <>
       {/* {username} */}
       <p style={{ color: "gray",  fontSize:"12px"}}>{relativeTime}</p>
     </>
   );
 };

export default DateFns;