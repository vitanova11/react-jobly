import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import JoblyApi from "../api/api";
import LoadingPage from "../common/LoadingPage";
import JobCardList from "../jobs/JobCardList";

/** Display details about one company. 
 *  
 * Routed at: /companies/:handle
 * 
*/


const CompanyDetail = () => {
    console.debug("Company Detail");
    const { handle } = useParams();
    console.log("the handle is:", handle); // working

    const [company, setCompany] = useState(null);

    // use effect to call the function on page load
    useEffect(function getCompanyOnMount() {
        console.debug("getCompanyOnMount, getCompanyInfo")
        getCompanyInfo();

    }, [handle]);

    // function to make api call to get company info
    async function getCompanyInfo() {
        let companyInfo = await JoblyApi.getCompany(handle);
        setCompany(companyInfo);
    }
    

    if (!company) return <LoadingPage />

    return (
        <div className="CompanyDetail"> 
            <h1>{company.name}</h1>
            <p>{company.description}</p>
            <JobCardList jobs={company.jobs} />
        </div>
    )
}

export default CompanyDetail;