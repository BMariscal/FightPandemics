import React from "react";
import Post from "./Post";

const Posts = ({
  filteredPosts,
  handlePostLike,
  loadFullPostContent,
  updateComments,
}) => {
  return (
    <div className="feed-posts">
      {Object.keys(filteredPosts).map((key) => (
        <Post
          post={filteredPosts[key]}
          updateComments={updateComments}
          handlePostLike={handlePostLike}
          loadFullPostContent={loadFullPostContent}
          key={key}
        />
      ))}
    </div>
  );
};

export default Posts;
