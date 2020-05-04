import React from "react";
import { Route, Redirect } from "react-router-dom";
import SessionStorageService from "../SessionStorageService";
var CryptoJS = require("crypto-js");

function AdminRoute({ component: Component, ...rest }) {
    var bytes  = CryptoJS.AES.decrypt(SessionStorageService.getToken(), process.env.REACT_APP_ADMIN_PASSWORD);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    return (
        <Route
            {...rest}
            render={props =>
                originalText === process.env.REACT_APP_ADMIN_USERNAME ? (
                    <Component {...props} />
                ) : (
                        <Redirect to="/" />
                    )
            }
        />
    );
}

export default AdminRoute;