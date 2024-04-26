import React, { useState } from "react";

import "./SearchForm.css";


/** Search Form
 *  used on CompanyList and JobList to filter what appears.
 * 
 *  This component renders the SearchForm and calls the searchFor() function prop,
 *  that runs in a parent component, to do the actual searching.
 */

const SearchForm = ({ searchFor }) => {
    console.debug("SearchForm", "searchFor=", typeof searchFor);

    const [searchTerm, setsearchTerm] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        searchFor(searchTerm.trim() || undefined);
        setsearchTerm(searchTerm.trim());
    }

    function handleChange(e) {
        setsearchTerm(e.target.value);
    }

    return (
        <div className="SearchForm mb-4">
            <form className="form-inline" onSubmit={handleSubmit}>
                <input
                    className="form-control form-control-lg flex-grow-1"
                    name="searchTerm"
                    placeholder="Enter search term ..."
                    value={searchTerm}
                    onChange={handleChange} 
                />
                <button type="submit" className="btn btn-lg btn-primary">
                    Search
                </button>
            </form>
        </div>
    )
}

export default SearchForm;