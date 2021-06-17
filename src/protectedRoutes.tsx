import React from "react";
import { Redirect } from "react-router-dom";
import { getToken } from './containers/User/userSelector';
import { useAppSelector } from "./app/hooks";

const ProtectedRoute = (props: any) => {
    const token = useAppSelector(getToken)
    const Component = props.component;
    const isAuthenticated = token
    return isAuthenticated ? <Component /> : <Redirect to={{ pathname: "/" }} />;
};

export default ProtectedRoute;
