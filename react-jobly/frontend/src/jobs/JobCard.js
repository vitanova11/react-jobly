import React, { useState, useContext, useEffect } from "react";
import UserContext from "../auth/UserContext";
import "./JobCard.css"

/** Display a preview of information about a job 
 * 
 * Props: id, title, salary, equity, companyName.
 * 
 * Implemented by JobCardList.
*/

function JobCard({ key, id, title, salary, equity, companyName }) {
    console.debug(JobCard);

    const { hasAppliedToJob, applyToJob } = useContext(UserContext);
    const [ applied, setApplied ] = useState();

    useEffect(function applicationStatus() {
        console.debug("JobCard useEffect updateAppliedStatus", "id=", id);

        setApplied(hasAppliedToJob(id));
    }, [id, hasAppliedToJob]);

    async function handleClick(e) {
        if (hasAppliedToJob(id)) return;
        applyToJob(id);
        setApplied(true);
    }


    return (
        <div className="JobCard card"> {applied}
        <div className="card-body">
          <h3 className="card-title">{title}</h3>
          <p>{companyName}</p>
          {salary && <div><small>Salary: $ {addCommas(salary)}</small></div>}
          {equity !== null && <div><small>Equity: {equity}</small></div>}
          <button className="apply-btn"
                  onClick={handleClick}
                  disabled={applied}>
            {applied ? "Applied" : "Apply"}
          </button>
        </div>
      </div>
    );



/** Format Salary with dollar sign and appropriate commas. */
    function addCommas(num) {
      let numString = num.toString();
      if (numString[0] === "-") {
          numString = numString.slice(1);
      }
  
      let commaIdx;
      if (numString.includes(".")) {
          commaIdx = numString.indexOf(".")
      } else {
          commaIdx = numString.length;
      }
  
      let decimals = numString.slice(commaIdx);
      let returnString = "";
  
      for (let i=commaIdx-1; i >= 0; i--) {
          returnString = numString[i] + returnString;
          if((commaIdx - i) %3 === 0 && i !==0) {
              returnString = "," + returnString;
          }
      }
      return (num < 0 ? "-": "") + returnString + decimals;
  }
}

export default JobCard;