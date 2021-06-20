import React, { useState, useEffect ,FC} from 'react';
import { useHistory } from 'react-router-dom';
import { RouteComponentProps } from "react-router";
import {
  Avatar,
  Button,
  CssBaseline,
  Link,
  Grid,
  Box,
  Typography,
  Container
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { makeStyles } from '@material-ui/core/styles';

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  login,
  addUsers
} from "./userSlice";
import { getToken, loginError, getUsers } from "./userSelector";
import users from './../../data/users.json';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type Props = { component: FC } & RouteComponentProps;

const SignIn:FC<Props>=() => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const token = useAppSelector(getToken);
  const error = useAppSelector(loginError);
  const allUsers = useAppSelector(getUsers);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const onSubmit = (e: any) => {
    e.preventDefault();
    dispatch(login({ email, password }))
  }

  const onEmailEdit = (e: any) => {
    setEmail(e.target.value);
  }

  const onPasswordEdit = (e: any) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (token) {
      history.push('./dashboard');
      console.log(token);
    }
  }, [token, history])
  
  useEffect(() => {
   if(allUsers.length === 0){
    dispatch(addUsers(users)) 
  }},[])

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <ValidatorForm className={classes.form} onSubmit={onSubmit}>
          <TextValidator
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            type="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={onEmailEdit}
            validators={["required", "isEmail"]}
            errorMessages={["This field is required", "Email is not valid"]}
            autoFocus
          />
          <TextValidator
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={onPasswordEdit}
            validators={["required"]}
            errorMessages={["This field is required"]}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            // disabled={error ?true :false}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link
                href="#"
                variant="body2"
                align="center"
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  history.push("./register");
                }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          {error && <div>{error}</div>}
        </ValidatorForm>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default SignIn;