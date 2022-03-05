// @ts-nocheck
/* eslint-disable react/prop-types */
import React from "react";
import { useSelector } from "react-redux";
import Post from "./post/post.js";
import useStyles from "./styles.js";
import { CircularProgress, Grid } from "@material-ui/core";

const Posts = ({ setCurrentPostId }) => {
  const classes = useStyles();
  const { posts, isLoading } = useSelector((state) => state.posts);
  if (!isLoading && !posts.length)
    return <h1> There are no posts to display!</h1>;

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      container
      className={classes.mainContainer}
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid item key={post._id} xs="12" sm="12" md="6" lg="3">
          <Post post={post} setCurrentPostId={setCurrentPostId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
