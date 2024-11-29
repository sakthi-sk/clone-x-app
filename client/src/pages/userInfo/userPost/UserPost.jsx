import React, { useEffect, useState } from 'react'
import PostCard from '../../../components/postCard/PostCard';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUserPosts } from '../../../Services/post';
import MediaLoader from '../../../components/loder/MediyaLoder';

const UserPost = () => {
   const { id } = useParams();
  const [userPosts, setUserPosts] = useState([]);

   const {
     data: posts,
     isLoading,
     isError,
   } = useQuery({
     queryKey: ["UserPOstList"],
     queryFn:()=> getUserPosts(id),
    
   });

     useEffect(() => {
       if (posts) {
         setUserPosts(posts);
       }
     }, [posts]);

   
     if (isLoading) {
       return <p ><MediaLoader/></p>;
     }

     if (isError) {
       return (
         <p style={{ color: "#71767B", textAlign: "center" }}>
           Failed to load posts. Please try again.
         </p>
       );
     }

     if (!posts || posts.length === 0) {
       return (
         <p style={{ color: "#71767B", textAlign: "center" }}>
           No posts available.
         </p>
       );
     } 
   
  return (
    <>
      {userPosts?.map(
        ({ comment, text, user, likes, _id, createdAt, img }, i) => (
          <div key={i}>
            <PostCard
              comment={comment}
              text={text}
              user={user}
              likes={likes}
              id={_id}
              Img={img}
              updatedAt={createdAt}
            />
          </div>
        )
      )}
    </>
  );
}

export default UserPost
