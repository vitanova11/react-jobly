import React from "react";

/** Display component for rendering bootstrap-style alerts 
 *  Used in:
 *  - LoginForm
 *  - SignupForm
 *  - ProfileForm
*/

function Alert({ type = "danger", messages = [] }) {
    console.debug("Alert", "type=", type, "messages=", messages);

    return (
        <div className={`alert alert-${type}`} role="alert">
            {messages.map(err => (
                <p className="mb-0 small" key={err}>
                    {err}
                </p>
            ))}
        </div>
    );
}

export default Alert;
