import React, { FC, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import {
  Avatar,
  Button,
  CssBaseline,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { makeStyles } from "@material-ui/core/styles";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { register, addUsers } from "./userSlice";
import { getToken, registerError, getUsers } from "./userSelector";
import users from "./../../data/users.json";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: 'red'
  }
}));

type Props = { component: FC } & RouteComponentProps;

const SignUp: FC<Props> = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const token = useAppSelector(getToken);
  const error = useAppSelector(registerError);
  const allUsers = useAppSelector(getUsers);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPasword] = useState("");
  const [description, setDescription] = useState("");
  const userRole = "user"

  const onRegister = (e: any) => {
    e.preventDefault();
    dispatch(register({ firstName,email,phone,address, password , description ,userRole }));
  };

  useEffect(() => {
    if (token) {
      history.push("./dashboard");
    }
  }, [token, history]);

  useEffect(() => {
    if(allUsers.length === 0){
    dispatch(addUsers(users)) 
  }},[])

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== password) {
        return false;
      }
      return true;
    });
    ValidatorForm.addValidationRule("isPhone", (value) => {
      let pattern = new RegExp(/^\d{10}$/);
      if (!pattern.test(phone)) {
        return false;
      }
      return true;
    });
  }, [confirmPassword, password , phone]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <ValidatorForm className={classes.form} onSubmit={onRegister}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextValidator
                name="firstName"
                variant="outlined"
                fullWidth
                id="firstName"
                label="First Name"
                value={firstName}
                onChange={(e: any) => setFirstName(e.target.value)}
                validators={["required"]}
                errorMessages={["This field is required"]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                validators={["required", "isEmail"]}
                errorMessages={["This field is required", "Email is not valid"]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Contact Number"
                name="phone"
                value={phone}
                onChange={(e: any) => setPhone(e.target.value)}
                validators={["required", "isPhone"]}
                errorMessages={[
                  "This field is required",
                  "Invalid Contact Number",
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                required
                fullWidth
                id="address"
                multiline
                label="Address"
                name="address"
                value={address}
                onChange={(e: any) => setAddress(e.target.value)}
                validators={["required"]}
                errorMessages={["This field is required"]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
                validators={["required"]}
                errorMessages={["This field is required"]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                required
                fullWidth
                name="confirm-password"
                label="Confirm Password"
                type="password"
                id="password"
                value={confirmPassword}
                onChange={(e: any) => setConfirmPasword(e.target.value)}
                validators={["required", "isPasswordMatch"]}
                errorMessages={[
                  "This field is required",
                  "Password deesn't match",
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                required
                fullWidth
                multiline
                id="description"
                label="Description"
                name="description"
                value={description}
                onChange={(e: any) => setDescription(e.target.value)}
                validators={["required"]}
                errorMessages={["This field is required"]}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            >
            Sign Up
          </Button>
          {error && <div className={classes.error}>{error}</div>}
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  history.push("./");
                }}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </ValidatorForm>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignUp;
