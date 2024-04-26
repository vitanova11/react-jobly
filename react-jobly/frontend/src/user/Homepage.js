import React, { useContext } from "react";
import { Link } from "react-router-dom";

import UserContext from "../auth/UserContext";

/** root web page.
 *  If a user is logged in, display welcome message.
 *  If no user is logged in, display login or signup.
 */

const Homepage = () => {
    const { currentUser } = useContext(UserContext);
    console.debug("Homepage", "currentUser=", currentUser);

    return (
        <div className="Homepage">
            <div className="container text-center">
                <h1 className="mb-4 font-weight-bold">Jobly</h1>
                {currentUser 
                    ? <h2>
                        Welcome Back, {currentUser.firstName || currentUser.username}!
                    </h2>
                    : (
                        <p>
                            <p className="lead">All the jobs in one, convenient place.</p>
                            <Link className="btn btn-primary font-weight-bold mr-3" to="/login">
                                <button>
                                    Login
                                </button>
                            </Link>
                            <Link className="btn btn-primary font-weight-bold mr-3" to="/signup">
                                <button>
                                    Sign Up
                                </button>
                            </Link>
                        </p>
                    )}
            </div>
        </div>
    )
}

export default Homepage;