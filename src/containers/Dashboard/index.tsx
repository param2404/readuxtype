import React, { FC , useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RouteComponentProps } from "react-router";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
    CssBaseline,
    Drawer,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    Container,
    Grid,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core';
import AllUsers from './AllUsers';
import MyProfile from './MyProfile';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ExitToApp, Person, People } from '@material-ui/icons';

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
    logout
} from "./../User/userSlice";
import { getToken, getUserData } from './../User/userSelector';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        background: "#3f71cd",
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

type Props = { component: FC } & RouteComponentProps;

const Dashboard: FC<Props> = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useAppDispatch();
    const token = useAppSelector(getToken);
    const userData = useAppSelector(getUserData);
    const [component,setComponent] = useState('me')
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const onLogout = () => {
        dispatch(logout())
    }

    useEffect(() => {
        if (!token) {
            history.push('./');
        }
    }, [token, history])

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Home
          </Typography>
                    <IconButton color="inherit" onClick={onLogout}>
                        <ExitToApp />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List><ListItem button>
                    <ListItemIcon onClick={()=>setComponent('me')}>
                        <Person />
                    </ListItemIcon>
                    <ListItemText primary="My Profile" />
                </ListItem>
                    {userData && userData.length && userData[0].userRole === 'admin' && <ListItem button>
                        <ListItemIcon onClick={()=>setComponent('users')}>
                            <People />
                        </ListItemIcon>
                        <ListItemText primary="Users" />
                    </ListItem>}
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                      {component === 'me' ? <MyProfile/>:<AllUsers/>}
                    </Grid>
                 </Container>
            </main>
        </div>
    );
};


export default Dashboard;