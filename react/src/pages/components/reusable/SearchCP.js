import React from "react";
import { UseSearchJob } from "../../../hooks/UseSearchJob";

export const SearchCP = () => {
 
      const { searchTerm, handleSearchInputChange } = UseSearchJob();

  return (
    <>
      <section className="py-5">
        <div>
          <p>
            Don't Worry! We are here for your latest job updates by top MNCs.
          </p>
          <h1>So Keep Applying! </h1>
          <p style={{ color: "rgb(14 114 223)" }}>
            And if you're an HR professional or recruiter, please visit our Job
            Post page to get a free recruiter account!{" "}
          </p>
        </div>
        <form>
          {/* {message && <div className="message">{message}</div>} */}
          <input
            className="homeform"
            type="text"
            id="Search"
            name="Search"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchInputChange}
            style={{ padding: "14px" }}
          />
          {/* <button  className='homesearchbtn' type="submit">Search</button> */}
        </form>
        
        {/* {searchResultsLenght > 0 && (
        <ul>
        {searchResults.map((result) => (
            <li key={result.id}>{result.title}</li>
            ))}
          </ul>
          )}
          {searchResultsLenght === 0 && !loading && searchTerm.trim() !== '' && (
            <p>No results found.</p>
            )} */}
      </section>
      
    </>
  );
};
