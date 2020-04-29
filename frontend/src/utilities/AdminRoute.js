import React from "react";
import { Route, Redirect } from "react-router-dom";
import SessionStorageService from "../SessionStorageService";
var CryptoJS = require("crypto-js");

function AdminRoute({ component: Component, ...rest }) {
    var bytes  = CryptoJS.AES.decrypt(SessionStorageService.getToken(), 'saroj');
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    return (
        <Route
            {...rest}
            render={props =>
                originalText === "admin" ? (
                    <Component {...props} />
                ) : (
                        <Redirect to="/login" />
                    )
            }
        />
    );
}

export default AdminRoute;