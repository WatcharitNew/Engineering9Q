import React from "react";
import { Route, Redirect } from "react-router-dom";
import SessionStorageService from "../SessionStorageService";

function StudentRoute({ component: Component, ...rest }) {
    
    return (
        <Route
            {...rest}
            render={props =>
                SessionStorageService.getUserID() !== "" ? (
                    <Component {...props} />
                ) : (
                        <Redirect to="/" />
                    )
            }
        />
    );
}

export default StudentRoute;