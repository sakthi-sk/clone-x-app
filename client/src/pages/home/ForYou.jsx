
import PostCard from '../../components/postCard/PostCard';
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from '../../Services/post';

import { useEffect, useState } from 'react';
import MediaLoader from '../../components/loder/MediyaLoder';

const ForYou = () => {
  
 const [allPosts, setAllPosts] = useState([]);
 
  const {
    data: posts,
    isLoading,
    isError,
    
  } = useQuery({
    queryKey: ["userPostsAll"],
    queryFn: getAllPosts,
    onSuccess: (data) => setAllPosts(data),
  });
 
  
  

   useEffect(() => {
     if (posts) {
       setAllPosts(posts);
     }
   }, [posts]);
   


 
      if (isLoading) {
        return (
          <p>
            <MediaLoader />
          </p>
        );
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
    {allPosts?.map(({ comment, text, user, likes, _id, createdAt, img }, i) => (
      <div key={i}>
        <PostCard
          comment={comment}
          text={text}
          user={user}
          likes={likes}
          id={_id}
          updatedAt={createdAt}
          Img={img}
          
        />
      </div>
    ))}
  </>
);
}


          

export default ForYou
