
import { useEffect, useState } from "react";
import PostCard from "../../components/postCard/PostCard";

import { useQuery } from "@tanstack/react-query";
import { getFollowingPosts } from "../../Services/post";
import MediaLoader from "../../components/loder/MediyaLoder";

const Following = () => {
  const [FollowingPosts, setFollowingPosts] = useState([]);

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userPostsAll"],
    queryFn: getFollowingPosts,
  });

  useEffect(() => {
    if (posts) {
      setFollowingPosts(posts);
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
    {isLoading && <p style={{ color: "red" }}>loding</p>}

    {FollowingPosts?.map(
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
};

export default Following;
