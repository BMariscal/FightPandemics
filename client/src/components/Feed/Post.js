// Core
import React, { useCallback, useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Modal, Card, WhiteSpace } from "antd-mobile";
import axios from "axios";

// Local
import PostCard from "./PostCard";
import PostSocial from "./PostSocial";
import Comments from "./Comments";
import FilterTag from "components/Tag/FilterTag";
import AutoSize from "components/Input/AutoSize";
import Heading from "components/Typography/Heading";
import TextAvatar from "components/TextAvatar";
import SubMenuButton from "components/Button/SubMenuButton";

// Icons
import SvgIcon from "../Icon/SvgIcon";
import statusIndicator from "assets/icons/status-indicator.svg";

const Post = ({
  handlePostLike,
  isAuthenticated,
  post,
  updateComments,
  loadFullPostContent,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [loadContent, setLoadContent] = useState(true);
  const [copied, setCopied] = useState(false);
  const [content, setContent] = useState("");
  const AvatarName =
    (post.author.name &&
      post.author.name.match(/\b\w/g).join("").toUpperCase()) ||
    "";

  // mock API to test functionality
  /* to be removed after full integration with user api */
  const [shared, setShared] = useState(false);
  const [comment, setComment] = useState("");
  const [fakeShares, setFakeShares] = useState(0);

  const handleComment = async (e) => {
    e.preventDefault();
    let response = {};
    const postId = post._id;
    const endPoint = `/api/posts/${postId}/comments`;
    const newComment = {
      comment,
    };

    try {
      response = await axios.post(endPoint, newComment);
    } catch (error) {
      console.log({ error });
    }

    if (response.data) {
      await updateComments({
        postId,
        comments: [...post.comments, { ...response.data }],
        commentsCount: post.comments.length + 1,
      });
      setComment("");
    }
  };

  const loadPostContent = async (e) => {
    e.preventDefault();
    let response = {};
    const postId = post._id;
    const endPoint = `/api/posts/${postId}`;

    if (!loadContent) {
      await loadFullPostContent({
        postId,
        content,
      });
    } else {
      try {
        setContent(post.content);
        response = await axios.get(endPoint);
      } catch (error) {
        console.log({ error });
      }
      if (response.data) {
        const content = response.data.post.content;
        await loadFullPostContent({
          postId,
          content,
        });
      }
    }
    setLoadContent(!loadContent);
  };

  const loadComments = useCallback(async () => {
    let response = {};

    if (showComments && !post.comments) {
      const postId = post._id;
      const endPoint = `/api/posts/${postId}`;

      try {
        response = await axios.get(endPoint);
      } catch (error) {
        console.log({ error });
      }

      if (response.data) {
        await updateComments({
          postId,
          comments: response.data.comments,
          commentsCount: response.data.commentsCount,
        });
      }
    }
  }, [post, showComments, updateComments]);

  useEffect(() => {
    loadComments();
  }, [showComments]); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePostDelete = async (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      const postId = post._id;
      const endPoint = `/api/posts/${postId}`;
      try {
        await axios.delete(endPoint);
      } catch (error) {
        console.log({ error });
      }
    }
  };

  const renderHeader = (
    <Card.Header
      title={post.author.name}
      thumb={
        post.author.photo ? (
          post.author.photo
        ) : (
          <TextAvatar>{AvatarName}</TextAvatar>
        )
      }
      extra={
        <span>
          <SvgIcon src={statusIndicator} className="status-icon" />
          {post.author.location.country}
        </span>
      }
    />
  );

  const renderContent = (
    <Card.Body className="content-wrapper">
      <Heading level={4} className="h4">
        {post.title}
      </Heading>
      <p className="post-description">{post.content}</p>
    </Card.Body>
  );

  const renderTags = (
    <Card.Body>
      {post.types &&
        post.types.map((tag, idx) => (
          <FilterTag key={idx} disabled={true} selected={false}>
            {tag}
          </FilterTag>
        ))}
    </Card.Body>
  );

  const renderViewMore = (
    <Card.Body className="view-more-wrapper">
      <a onClick={loadPostContent}>
        {loadContent ? (
          <span className="view-more">View More</span>
        ) : (
          <span className="view-more">View Less</span>
        )}
      </a>
    </Card.Body>
  );

  const renderComments = (
    <Card.Body
      className={`comments-wrapper ${showComments ? "show-comments" : ""}`}
    >
      {isAuthenticated ? (
        <AutoSize
          placeholder={"Write a comment..."}
          onPressEnter={handleComment}
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
      ) : (
        <div>Only logged in users can comment.</div>
      )}
      {showComments ? <Comments comments={post.comments} /> : ""}
    </Card.Body>
  );

  const renderSocialIcons = (
    <Card.Body className="content-wrapper">
      <PostSocial
        handlePostLike={handlePostLike}
        url={post.url}
        liked={post.liked}
        shared={shared}
        showComments={showComments}
        numLikes={post.likesCount}
        numComments={post.commentsCount}
        numShares={fakeShares}
        setShowComments={() => setShowComments(!showComments)}
        onCopyLink={() => {
          if (!shared) setFakeShares(fakeShares + 1);
          setShared(true);
          return setCopied(!copied);
        }}
        id={post._id}
      />
    </Card.Body>
  );

  const renderShareModal = (
    <Modal
      onClose={() => setCopied(!copied)}
      maskClosable={true}
      closable={true}
      visible={copied}
      transparent
    >
      <Heading level={4} className="h4">
        Link Copied!
      </Heading>
    </Modal>
  );

  return (
    <PostCard>
      <div className="card-header">
        {renderHeader}
        <div className="card-submenu">
          <SubMenuButton deletePost={handlePostDelete} />
        </div>
      </div>
      <WhiteSpace size="md" />
      {renderTags}
      <WhiteSpace />
      {renderContent}
      {renderViewMore}
      {renderSocialIcons}
      {renderComments}
      {renderShareModal}
    </PostCard>
  );
};

const mapStateToProps = ({ session: { isAuthenticated } }) => {
  return {
    isAuthenticated,
  };
};

export default connect(mapStateToProps)(Post);
