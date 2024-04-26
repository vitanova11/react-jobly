import React, { useEffect, useState } from "react";
import JoblyApi from "../api/api";

import LoadingPage from "../common/LoadingPage";
import SearchForm from "../common/SearchForm";
import JobCardList from "./JobCardList";


/** Display a list of all the cjobs, with a preview description of job. 
 *  
 * Routed at: /jobs
 * State: jobs, setJobs
 * 
*/


const JobList = () => {
    console.debug("JobList")

    const [jobs, setJobs] = useState(null);

    useEffect(function getJobsOnMount() {
        console.debug("JobList useEffect getJobsOnMount");
        search();
    }, []);

    async function search(title) {
        let jobs = await JoblyApi.getJobs(title);
        setJobs(jobs);
    }

    if (!jobs) return <LoadingPage />

    return (
        <div className="JobList">
            <SearchForm searchFor={search} />
                {jobs !== null 
                ? <JobCardList jobs={jobs} />
                : <p>Sorry, no results were found.</p>
                }
        </div>
    );
}

export default JobList;