import React, { useEffect, useState } from "react";

export const UseSearchJob = () => {
    
     //--------------Search--------------\\
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
      try {
        setLoading(true);

        // Perform your search API call here
        // const encodedSearchTerm = encodeURIComponent(searchTerm);
        const response = await fetch(
          `http://localhost:5008/api/addjob/getJobbyjobRole/?jobRole=${searchTerm}`
        );

        console.log("response==================>", response);
        console.log("searchitem---------------->", searchTerm);
        const data = await response.json();
        console.log("data1---------------", data);
        console.log("data2---------------", data.data);
        if (data.success === true) {
          setSearchResults(data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setLoading(false);
      }
    };

    if (searchTerm.trim() !== "") {
      fetchData();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const searchResultsLenght = searchResults?.length;
  return {searchResultsLenght, searchTerm, searchResults, loading, handleSearchInputChange}
}
