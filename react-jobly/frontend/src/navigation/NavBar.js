import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { Navbar, Nav } from "reactstrap";
import UserContext from "../auth/UserContext";
import "./NavBar.css";

/** Navigation bar, to appear on every render. 
 *  Returns loggedInNav() if user is logged in.
 *  Returns loggedOutNav() if no user is logged in.
 * 
*/ 

const NavBar = ({ logout }) => {
    const { currentUser } = useContext(UserContext);
    console.debug("Navigation", "currentUser=", currentUser);

    // NavBar for logged in user
    // show logout, jobs, companies and profile links
    function loggedInNavBar() {
        return (
            <Nav className="page-options" navbar>
                <NavLink className="nav-link" to="/companies">
                    Companies
                </NavLink>

                <NavLink className="nav-link" to="/jobs">
                    Jobs
                </NavLink>

                <NavLink className="nav-link" to="/profile">
                    Profile
                </NavLink>

                <Link className="nav-link" to="/" onClick={logout}>
                    Logout
                </Link>
            </Nav>
        );
    }
    // NavBar for unlogged in user
    // only show login and signup links
    function loggedOutNavBar() {
        return (
            <Nav className="page-options" navbar>
                <NavLink className="nav-link" to="/login">
                    Login
                </NavLink>
                <NavLink className="nav-link" to="/signup">
                    Signup
                </NavLink>
            </Nav>

        );
    }
    return (
        <Navbar expand="md">
            <NavLink className="company-name" to="/">
                Jobly
            </NavLink>
            { currentUser ? loggedInNavBar() : loggedOutNavBar()}
        </Navbar>
    );
}

export default NavBar;