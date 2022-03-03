// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Container, Grow, Grid, Paper } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { getPosts } from "../actions/posts";
import Posts from "../components/Posts/Posts";
import Form from "../components/Form/Form";
import Paginate from "../components/paginate/pagination";

const Home = () => {
  const dispatch = useDispatch();
  const [currentPostId, setCurrentPostId] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentPostId, dispatch]); // when clear after create or update should re-fetch

  return (
    <Grow in>
      <Container>
        <Grid
          container
          justify="space-between"
          spacing={3}
          alignItems="stretch"
        >
          <Grid item xs="12" sm="8">
            <Posts setCurrentPostId={setCurrentPostId} />
          </Grid>
          <Grid item xs="12" sm="4">
            <Form
              currentPostId={currentPostId}
              setCurrentPostId={setCurrentPostId}
            />
            <Paper elevation={6}>
              <Paginate />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
