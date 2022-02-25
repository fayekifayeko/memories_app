import React, { useEffect, useState } from "react";
import { Container, Grow, Grid } from "@material-ui/core";
import Form from "./components/Form/Form.js";
import Posts from "./components/Posts/Posts.js";
import useStyles from "./styles.js";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";
import NavBar from "./components/NavBar/NavBar.js";

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentPostId, setCurrentPostId] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentPostId, dispatch]); // when clear after create or update should re-fetch

  return (
    <Container maxidth="lg">
      <NavBar />
      <Grow in>
        <Container>
          <Grid
            container
            className={classes.mainContainer}
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
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
