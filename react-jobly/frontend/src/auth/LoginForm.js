import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import Alert from "../common/Alert";

/** Display login form for an existing user to login.
 * 
 * When submitted:
 *  1. calls login function prop (from App)
 *  2. redirects to route: /companies
 *  
 * Routed at: /login
 * 
*/


const Login = ({ login }) => {
    const navigate = useNavigate();
    const INITIAL_STATE = {
        username: "",
        password: ""
    }

    const [formData, setFormData] = useState(INITIAL_STATE);
    const [formErrors, setFormErrors] = useState([]);

    /** Handle form submit
     *  Calls the login function prop. 
     *  Redirect to "/companies", if successful
     */
    async function handleSubmit(e) {
        e.preventDefault();  
        let result = await login(formData);
        console.log("login result:", result)
        if (result.success) {
            console.log("Navigating to /companies...")
            navigate("/companies");
            console.log("current URL:", window.location.pathname); // current url
        } else {
            setFormErrors(result.errs);
        }
    }

    /** Handle change of form data. */
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData, [name]: value
        }));
    }

    return (
        <div className="LoginForm">
            <form className="LoginForm" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input className="form-control"
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input className="form-control"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                    />
                </div>

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null
                }

                <button type="submit"
                        className="btn btn-primary float-right"
                        onSubmit={handleSubmit}>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Login;