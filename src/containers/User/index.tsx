import React, { useState, useEffect ,FC} from 'react';
import { useHistory } from 'react-router-dom';
import { RouteComponentProps } from "react-router";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  login,
} from "./userSlice";
import { getToken, loginError} from './userSelector'

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const onSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(login({ email, password }))
  }

  useEffect(() => {
    if (token) {
      history.push('./dashboard');
      console.log(token);
    }
  }, [token,history])

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
        <form className={classes.form} >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
            // disabled={error ?true :false}
          >
            Sign In
            </Button>
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2" align="center"
                onClick={(e: React.MouseEvent<HTMLElement>) => { history.push('./register') }}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        {error && <div>{error}</div>}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default SignIn;