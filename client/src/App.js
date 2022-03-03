// @ts-nocheck
import { Container } from "@material-ui/core";
import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Auth from "./Auth/Auth";
import NavBar from "./components/NavBar/NavBar.js";
import Home from "./Home/Home";
import PostDetails from './components/PostDetails/PostDetails'

const App = () => {
const user =  JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxidth="xl">
        <NavBar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact  component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} /> //if put the url manually
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
