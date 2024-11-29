import React, { useEffect, useState } from 'react'
import PostCard from '../../../components/postCard/PostCard';
import { useQuery } from '@tanstack/react-query';
import { getLikedPosts } from '../../../Services/post';
import MediaLoader from '../../../components/loder/MediyaLoder';

const UserLikeList = () => {

  const [likePosts, setLikePosts] = useState([]);

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["UserLikeListPost","likePosts"],
    queryFn: getLikedPosts,
    onSuccess: (data) => setLikePosts(data),
  });

  useEffect(() => {
    if (posts) {
      setLikePosts(posts);
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
      {likePosts?.map(({ comment, text, user, likes, _id, createdAt,img }, i) => (
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
      ))}
    </>
  );
}

export default UserLikeList
