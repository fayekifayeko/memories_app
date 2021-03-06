// @ts-nocheck
import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import memories from "../../images/memories.png";
import memoriesLogo from "../../images/memoriesLogo.png";
import memoriesText from "../../images/memoriesText.png";
import useStyles from "./styles.js";
import { Link, useHistory, useLocation } from "react-router-dom";
import { LOGOUT } from "../../constants/actions";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

const NavBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const handleLogout = () => {
    dispatch({ type: LOGOUT });
    history.push("/");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
    }
    setUser(JSON.parse(localStorage.getItem("profile"))); // when location changes
  }, [location]);
  return (
    <div>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Link to="/" className={classes.brandContainer}>
          <img src={memoriesText} alt="icon" height="45" />
          <img
            className={classes.image}
            src={memoriesLogo}
            alt="icon"
            height="40"
          />
        </Link>
        <Toolbar className={classes.toolbar}>
          {user?.profile ? (
            <div className={classes.profile}>
              <Avatar
                className={classes.purple}
                alt={user?.profile.name}
                src={user?.profile.imageUrl}
              >
                {user?.profile.name.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant="h6">
                {user.profile.name}
              </Typography>
              <Button
                variant="contained"
                className={classes.logout}
                color="secondary"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              variant="contained"
              component={Link}
              to="/auth"
              className={classes.logout}
              color="primary"
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
