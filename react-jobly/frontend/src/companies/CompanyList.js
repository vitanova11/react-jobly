import React, { useState, useEffect } from "react";
import JoblyApi from "../api/api";

import SearchForm from "../common/SearchForm";
import LoadingPage from "../common/LoadingPage";
import CompanyCard from "./CompanyCard";

/** Display a list of all the companies, with a preview description of company. 
 *  
 * Routed at: /companies
 * State: companies, setCompanies
 * 
*/

function CompanyList() {
    console.debug("CompanyList");

    const [companies, setCompanies] = useState(null);

    useEffect(function getCompaniesOnMount() {
        console.debug("CompanyList useEffect search");
        search();
    }, []);

    /** Triggered when SearchForm submits, resets companies. */
    async function search(name) {
        let companies = await JoblyApi.getCompanies(name);
        setCompanies(companies);
    }

    if (!companies) return <LoadingPage />
        
    return (
        <div className="CompanyList col-md-8 offset-md-2">
            <SearchForm searchFor={search}/>
            {companies !== null ? (
                <div className="companyList-cards">
                        {companies.map(c => (
                            <CompanyCard 
                                id={c.handle}
                                handle={c.handle}
                                name={c.name}
                                logoUrl={c.logoUrl}
                                description={c.description}
                            />
                                
                        ))}
                </div>
            ) : (
                <p>Sorry, no results were found.</p>
            )}
        </div>
    )
}

export default CompanyList;