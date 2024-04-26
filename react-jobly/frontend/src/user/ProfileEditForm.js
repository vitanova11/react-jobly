import React, { useState, useContext } from "react";
import JoblyApi from "../api/api";
import UserContext from "../auth/UserContext";
import Alert from "../common/Alert";

import "./ProfileEditForm.css";

/** Display profile edit form for the current logged-in user to edit their profile.
 *  
 * Routed at: /profile
 * Displays existing information of current user and allows current user to edit. 
 * When submitted, update changes to db.
 * User cannot change their username.
 * 
*/


function ProfileEditForm() {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        username: currentUser.username,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        password: "",
    });
    const [formErrors, setFormErrors] = useState([]);


    console.debug("ProfileForm", 
                    "currentUser=", currentUser,
                    "formData=", formData,
                    "formErrors", formErrors)

    // handle submit
    async function handleSubmit(e) {
        // NOT EDITING USERNAME - update the correct user in db
        e.preventDefault();

        let profileData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password
        }

        let username = formData.username;
        let updatedUser;

        try {
            updatedUser = await JoblyApi.saveProfile(username, profileData);
        } catch (errs) {
            debugger;
            setFormErrors(errs);
            return;
        }

        setFormData(formData => ({...formData, password: ""}));
        setFormErrors([]);
        setCurrentUser(updatedUser); //updates the current user in db and website
    }

    // handle change
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData, [name]: value
        }));
        setFormErrors([]);
    }

    // return a form 
    return (
        <div className="profile-edit-form">
            <h1>Edit Profile</h1>
            <form>
                <div>
                    <label htmlFor="username">Username: {formData.username}</label>
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input name="firstName"
                           className="form-control"
                           value={formData.firstName}
                           onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input name="lastName"
                           className="form-control"
                           value={formData.lastName}
                           onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input name="email"
                           className="form-control"
                           value={formData.email}
                           onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Confirm Password:</label>
                    <input name="password"
                           className="form-control"
                           type="password"
                           value={formData.password}
                           onChange={handleChange}
                    />
                </div>

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} /> 
                    : null
                }

                <button className="save-btn"
                        onClick={handleSubmit}>
                    Save Changes
                </button>
            </form>
        </div>
    );
}

export default ProfileEditForm;