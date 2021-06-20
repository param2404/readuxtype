import React, { FC, useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import {
    Avatar,
    Button,
    CssBaseline,
    Grid,
    Typography,
    Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { makeStyles } from "@material-ui/core/styles";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { update } from "./../User/userSlice";
import { getUserData } from "./../User/userSelector";


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
}));

type Props = { component: FC } & RouteComponentProps;

const MyProfile: any = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const user: any = useAppSelector(getUserData);
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");

    const onUpdate = (e: any) => {
        e.preventDefault();
        dispatch(
            update({ firstName, email, phone, address, description })
        );
    };

    useEffect(() => {
        ValidatorForm.addValidationRule("isPhone", (value) => {
            let pattern = new RegExp(/^\d{10}$/);
            if (!pattern.test(phone)) {
                return false;
            }
            return true;
        });
    }, [phone]);

    useEffect(() => {
        setFirstName(user[0].firstName)
        setEmail(user[0].email)
        setPhone(user[0].phone)
        setAddress(user[0].address)
        setDescription(user[0].description)
    }, [user])


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    My Profile
        </Typography>
                <ValidatorForm className={classes.form} onSubmit={onUpdate}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextValidator
                                name="firstName"
                                variant="outlined"
                                fullWidth
                                id="firstName"
                                label="First Name"
                                value={firstName || ""}
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
                                disabled
                                value={email || ""}
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
                                value={phone || ""}
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
                                value={address || ""}
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
                                multiline
                                id="description"
                                label="Description"
                                name="description"
                                value={description || ''}
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
                        Update
          </Button>
                </ValidatorForm>
            </div>
        </Container>
    );
};

export default MyProfile;
