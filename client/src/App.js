// @ts-nocheck
import { Container } from "@material-ui/core";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Auth from "./Auth/Auth";
import NavBar from "./components/NavBar/NavBar.js";
import Home from "./Home/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Container maxidth="lg">
        <NavBar />
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/auth" component={Auth} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
