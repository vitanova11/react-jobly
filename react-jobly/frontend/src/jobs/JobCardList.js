import React from "react";

import JobCard from "./JobCard";

/** Displays a list of job cards.
 * 
 * Implemented at JobList and CompanyDetail.
 */

function JobCardList({ jobs }) {
    console.debug("JobCardList", "jobs=", jobs);

    return (
        <div className="JobCardList">
            {jobs.map(j => (
                <JobCard
                    // key={j.id}
                    id={j.id}
                    title={j.title}
                    companyName={j.companyName}
                    salary={j.salary}
                    equity={j.equity}
                />
            ))}

        </div>
    );

}   
export default JobCardList;