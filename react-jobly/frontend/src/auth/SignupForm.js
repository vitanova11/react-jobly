import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../common/Alert";

/** Display signup form and manage update to state on submission.
 * 
 * When submitted:
 *  1. calls signup function prop (from App)
 *  2. redirects to route: /companies
 *  
 * Routed at: /signup
 * 
*/


const SignupForm = ({ signup }) => {
    const navigate = useNavigate(); // history instance; use on handleSubmit
    const INITIAL_STATE = {
        username: "",
        firstName: "",
        lastName: "",
        password: "",
        email: ""
    }

    const [formData, setFormData] = useState(INITIAL_STATE)
    const [formErrors, setFormErrors] = useState([])

    /** Handle form submit
     *  Calls the signup function prop. 
     *  Redirect to "/companies", if successful
     */
    async function handleSubmit(e) {
        e.preventDefault(); // if the event does not get explicitly handled, the default action should not be taken 
        let result = await signup(formData);
        if (result.success) {
            navigate("/companies");
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
        <div className="SignupForm">
            <form className="SignupForm" onSubmit={handleSubmit}>
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
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input className="form-control"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input className="form-control"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input className="form-control"
                            name="email"
                            type="email"
                            value={formData.email}
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

export default SignupForm;