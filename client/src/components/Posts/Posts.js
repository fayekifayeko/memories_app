import React from 'react';
import { useSelector } from 'react-redux';
import Post from './post/post.js';
import useStyles from './styles.js';
import {CircularProgress, Grid } from '@material-ui/core';

const Posts = ({setCurrentPostId}) => {  
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);
return (
  !posts ? <CircularProgress/>
  :
  (
    <Grid container className={classes.mainContainer} alignItems='stretch' spacing={3}>
      {posts.map(post => (
        <Grid item key={post._id}  sm={6} md={6} xs={6}>
          <Post post={post} setCurrentPostId={setCurrentPostId} />
        </Grid>
      ))}
    </Grid>
  ) 
  );
};

export default Posts;
