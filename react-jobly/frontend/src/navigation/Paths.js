import React, {useContext} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import PrivateRoute from "./PrivateRoute";
import UserContext from "../auth/UserContext";

import Homepage from "../user/Homepage";
import CompanyList from "../companies/CompanyList";
import CompanyDetail from "../companies/CompanyDetail";
import JobList from "../jobs/JobList";
import SignupForm from "../auth/SignupForm";
import LoginForm from "../auth/LoginForm";
import ProfileEditForm from "../user/ProfileEditForm";


/** Site-wide routes 
 *  Some routes only visible when user is logged in: 
 *  /, /companies, /jobs, /company/:handle, /profile
 * 
 *  Some visible when no user is logged in:
 *  /login, /signup, /
 * 
 *  Any non-existent route redirects to the homepage: /
*/

function Paths({ login, signup }) {
    console.debug("Routes", `login=${typeof login}`, `register=${typeof register}`);
    return (
        <div>
            <Routes>
                <Route exact path="/" element={<Homepage />} />
                <Route exact path="/signup" element={<SignupForm signup={signup} />} />
                <Route exact path="/login" element={<LoginForm login={login} />} />

                <Route element={<PrivateRoute />}>
                    <Route exact path="/companies" element={<CompanyList />} />
                    <Route exact path="/companies/:handle" element={<CompanyDetail />} />
                    <Route exact path="/jobs" element={<JobList />} />
                    <Route exact path="/profile" element={<ProfileEditForm />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Route>

            </Routes>
        </div>
    )
}

function PrivateRoute() {
    const { currentUser } = useContext(UserContext);

    console.debug("PrivateRoute", "currentUser=", currentUser);

    if (!currentUser) {
        return <Navigate to="/" />
    }

    return (
        <Routes>
            <Route path="/companies" element={<CompanyList />} />
            <Route path="/companies/:handle" element={<CompanyDetail />} />
            <Route path="/jobs" element={<JobList />} />
            <Route path="/profile" element={<ProfileEditForm />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default Paths;