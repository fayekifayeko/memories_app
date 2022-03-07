// @ts-nocheck
import {
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import useStyles from "./styles";
import { getPost, getPostsBySearch } from "../../actions/posts";
import CommentsSection from "./CommentsSection";

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const classes = useStyles();
  const { id } = params;

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    post &&
      dispatch(
        getPostsBySearch({ searchTerm: "none", tags: post.tags.join(",") })
      ); // recommended posts by tags
  }, [post]);

  if (!post) return null; // no error of type can't read name of undefined

  if (isLoading)
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id); // remove current post from recommended list

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post.name}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            color="textSecondary"
          >
            {post.tags.map((item) => `#${item}`)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {posts.message}
          </Typography>
          <Typography variant="h6">Created by: {posts.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />

          <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <CommentsSection post={post} />
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </div>
      </div>
      {recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          {recommendedPosts.map(
            ({ title, name, message, likes, selectedFile, _id }) => (
              <div
                style={{ margin: "20px", cursor: "pointer" }}
                onClick={() => history.push(`/posts/${_id}`)}
                key={_id}
              >
                <Typography gutterBottom variant="h6">
                  {title}
                </Typography>
                <Typography gutterBottom variant="subtitle2">
                  {name}
                </Typography>
                <Typography gutterBottom variant="subtitle2">
                  {message}
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                  Likes: {likes.length}
                </Typography>
                <img src={selectedFile} width="200px" />
              </div>
            )
          )}
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
