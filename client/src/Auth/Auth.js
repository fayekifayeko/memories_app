// @ts-nocheck
import React, { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import useStyles from "./styles.js";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "../components/Input/Input.js";
import { GoogleLogin } from "react-google-login";
import Icon from "./Icon.js";
import { useDispatch } from "react-redux";
import { AUTH } from "../constants/actions.js";
import { useHistory } from "react-router-dom";
import { signin, signup } from "../actions/auth.js";

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault(); // not to refresh the page after click submit
    isSignup
      ? dispatch(signup(formData, history))
      : dispatch(signin(formData, history));
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSuccess = async (res) => {
    try {
      const profile = res?.profileObj;
      const token = res?.tokenId;
      dispatch({ type: AUTH, payload: { profile, token } });
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleFailure = (error) => {
    console.log("Google sign in has failed, Please try again later!", error); // shouldn't console the error in production
  };

  return (
    <Container maxWidth="xs" component="main">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h6">{isSignup ? "Sign up" : "Sign in"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="346737127159-pmf1c6461fnpgei2qek2ngdjtsg4ia61.apps.googleusercontent.com"
            render={(props) => (
              <Button
                className={classes.googleButton}
                disabled={props.disabled}
                color="primary"
                onClick={props.onClick}
                startIcon={<Icon />}
                variant="contained"
                fullWidth
              >
                Google Sign In
              </Button>
            )}
            onSuccess={handleSuccess}
            onFailure={handleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
