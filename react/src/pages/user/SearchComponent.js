import React, { useState, useEffect } from 'react';



const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Perform your search API call here
        const response = await fetch(`http://localhost:5008/api/addjob/getJobbyjobRole/?query=${searchTerm}`);
        const data = await response.json();
        setSearchResults(data.results);
        setLoading(false);
        console.log("searchitem----------------",searchTerm);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setLoading(false);
      }
    };

    if (searchTerm.trim() !== '') {
      fetchData();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const searchResultsLenght=searchResults.length

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchInputChange}
      />
      {loading && <p>Loading...</p>}
      { searchResultsLenght > 0 && (
        <ul>
          {searchResults.map((result) => (
            <li key={result.id}>{result.title}</li>
          ))}
        </ul>
      )}
      {searchResultsLenght === 0 && !loading && searchTerm.trim() !== '' && (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchComponent;


//--------------------------search-----------------------\\


// const [searchQuery, setSearchQuery] = useState(""); //----------Use for Searching-----------------------//
// const [allQuery, setAllQuery] = useState({}); //-----------------Also Use For Searching------------------// 


// useEffect(()=>{

//   let payload = {
//     pageNo: pageNo,
//     pageSize: pageSize,
//   };
//   getAllGameData(payload)
// },[allQuery, pageNo, pageSize])

// //----------------------Data Fetching For Listing--------------------------//

// const getAllGameData =(payload)=>{
//   setLoading(true);
//   console.log("payload+++++++++++",payload);
// setTimeout(() => {
// gameService.getgameList(allQuery,payload).then((res)=>{
//   console.log("allQuery===>",allQuery);
//   console.log("RES22222===>",res);
 
//   setGameList(res)

  

// }).catch((e)=>{
//   toast.error(e.message, {
//     position: "top-right",
//     autoClose: 3000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "colored",
//   });
//   setLoading(false)

// })
// .finally(() => {
//   setLoading(false);
// });

// },500);
 


// }

// function handleSearch(e) {
//   setSearchQuery(e.target.value);
// }

// function searchHit() {
//   setAllQuery({ title: searchQuery });
// }


// <div className="search_form">


//   <input
//     type="text"
//     className="form-control"
//     placeholder="Search By Title"
//     value={searchQuery}
//     onChange={handleSearch}

//   />

 
//     <button
//       className="search_btn" onClick={() => searchHit()}>
     
//     </button>




   

//         </div >