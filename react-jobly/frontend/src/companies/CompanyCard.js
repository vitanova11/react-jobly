import React from "react";
import { Link } from "react-router-dom";

import "./CompanyCard.css";

/** Display a preview of information for the company.
 * 
 * Props: handle, name, description, logoUrl
 * 
 * implemented by CompanyList at route: "/companies"
 */

function CompanyCard({ handle, name, description, logoUrl }) {
    console.debug("CompanyCard");

    return (
        <Link className="CompanyCard" to={`/companies/${handle}`}>
            <div className="company-info">
                <h5 className="company-title">
                    {name}
                    {/* {logoUrl && <img src={logoUrl}
                                     alt={name}
                                     className="float-right-ml-5" />} */}
                </h5>
                <p><small>{description}</small></p>
            </div>
        </Link>
    );
}

export default CompanyCard;