import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import UserContext from "../auth/UserContext";

/** Private Route Component
 *  Checks to see if a user is logged in.
 *  Only shows route if user is logged in, otherwise redirects to /login.
 */

function PrivateRoute({ path, children }) {
    const { currentUser } = useContext(UserContext);

    console.debug("PrivateRoute", "path=", path, "currentUser=", currentUser);

    if (!currentUser) {
        return <Navigate to="/login" />
    }

    return (
        <Route path={path}>
            element={children}
        </Route> 
         
    );
}

export default PrivateRoute;