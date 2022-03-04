// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { getPosts, getPostsBySearch } from "../actions/posts";
import Posts from "../components/Posts/Posts";
import Form from "../components/Form/Form";
import Paginate from "../components/paginate/pagination";
import { useHistory, useLocation } from "react-router-dom";
import useStyles from "./styles";
import ChipInput from "material-ui-chip-input";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [currentPostId, setCurrentPostId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [tags, setTags] = useState([]);
const classes = useStyles();
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  useEffect(() => {
    dispatch(getPosts());
  }, [currentPostId, dispatch]); // when clear after create or update should re-fetch

  const handleKeyPress = (e) => {
    if(e.keyCode === 13) {
      handleSearch();
    }
  }
  const handleAdd = (item) => {
    setTags([...tags, item])
  }
  const handleSearch = () => {
    if(searchTerm.trim() || tags.length>0) {
      dispatch(getPostsBySearch({searchTerm, tags: tags.join(',')})) // tags is array so we need to stringify it to be sent as a query param
      history.push(`/posts/search?searchTerm=${searchTerm || 'none'}&tags=${tags.join(',')}`) // you can copy the search url and send it to your friend to search quickly
    } else {
      history.push('/')
    }
  }

  const handleDelete= (item) => {
    setTags(tags.filter(tag => tag !== item))
  }

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justify="space-between"
          spacing={3}
          alignItems="stretch"
          className={classes.gridContainer}
        >
          <Grid item xs="12" sm="6" md="9">
            <Posts setCurrentPostId={setCurrentPostId} />
          </Grid>
          <Grid item xs="12" sm="6" md="3">
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              name="search"
              variant="outlined"
              fullWidth
              label="Search memories"
              />
              <ChipInput 
              value={tags}
              onAdd={handleAdd}
              onDelete={handleDelete}
              label="Search tags"
              variant="outlined"
              style={{margin: '10px 0'}}
              />
              <Button onClick={handleSearch} variant="contained" color="primary" className={classes.searchButton}>Search</Button>
            </AppBar>
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
