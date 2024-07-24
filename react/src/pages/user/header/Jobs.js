import React, { useEffect, useState } from 'react'
import './Jobs.css'
// import { redirect } from 'react-router-dom';
import { UseAutheContext } from "../../../hooks/UseAutheContext";
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const Jobs = () => {
    const [users, setUser] = useState([]);
    const { user } = UseAutheContext()
    // const [message, setMessage] = useState('');
  
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:5008/api/addjob/getalljob')
        // console.log(response);
        const data = await response.json();
        // setMessage('Internal Error!');
        // console.log(data);
        setUser(data.data)
      } catch (err) {
        console.log(err);
      }
    }
  
    useEffect(() => {
      fetchData()
    }, [])
  
    const handleOpenLink = (url) => {
      window.open(url, '_blank');
    };
  
  
    //--------------Search--------------\\
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
  
          // Perform your search API call here
          // const encodedSearchTerm = encodeURIComponent(searchTerm);
          const response = await fetch(`http://localhost:5008/api/addjob/getJobbyjobRole/?jobRole=${(searchTerm)}`)
  
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
    const searchResultsLenght = searchResults?.length
  

  return (
    <>
    <div className='homecontainer1'>

        
        <div>
          <p className='homepost'>Don't Worry! We are here for your latest job updates by top MNCs.</p>
          <h1 className='homepost'>So Keep Applying! </h1>
          <p className='homepost' style={{ color: "#67b311" }}>And if you're an HR professional or recruiter, please visit our Job Post page to get a free recruiter account! </p>
        </div>
      <form  >
        {/* {message && <div className="message">{message}</div>} */}
        <input
          className='homeform'
          type="text"
          id="Search"
          name="Search"
          placeholder='Search...'
          value={searchTerm}
          onChange={handleSearchInputChange}
          style={{ padding: "14px" }}


        />
        {/* <button  className='homesearchbtn' type="submit">Search</button> */}
      </form>
      {loading && <p>Loading...</p>}
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
      <div>


        


      </div>

      
        {/* <SearchComponent /> */}
        {searchTerm && (<>{searchResultsLenght > 0 && (<>{!user && (<>
          {searchResults.map((user, index) => (<ul className='homecontainer' key={index}>
            {/* <td>{user._id}</td> */}
            <div type="url" onClick={() => handleOpenLink(user.companyWebsiteLink)} >
              <h6 className='homeCompanyName'>{user.companyName}</h6>
            </div>
            <div><h1 className='homejobtitel'>{user.jobRole}</h1></div>
            <div><h6 className='homecontactEmail'>Email: {user.contactEmail}</h6></div>
            <div><h6 className='homecontactEmail'>Skills: {user.contactEmail}</h6></div>
            <div>
              <Table>
                <td><p className='homeskills'>Location: {user.location}</p></td>
                <td><h6 className='homesalary'>Salary: {user.salary}</h6></td>
                <td><h6 className='homeexperience'>Experience: {user.experience}</h6></td>
              </Table>
            </div>
            <div> <Link to="/login" ><button className='homeapplybutton' ><h6 className='h6text'>Login To Get Access To Apply Jobs</h6></button></Link></div>
          </ul>)
          )}
        </>)}

          {/* <form className='homecontainer'> */}
          {user && (<>{searchResults.map((user, index) =>
          (
            <ul className='homecontainer' key={index}>
              {/* <td>{user._id}</td> */}
              <div type="url" onClick={() => handleOpenLink(user.companyWebsiteLink)} ><h6 className='homeCompanyName'>{user.companyName}</h6></div>
              <div><h1 className='homejobtitel'>{user.jobRole}</h1></div>
              <div><h6 className='homecontactEmail'>Email: {user.contactEmail}</h6></div>
              <div>

                <Table>
                  <td><p className='homeskills'>Skills: {user.skills}</p></td>
                  <td><h6 className='homesalary'>Salary: {user.salary}</h6></td>
                  <td><h6 className='homeexperience'>Experience: {user.experience}</h6></td>
                </Table>



              </div>

              <div> <button className='homeapplybutton' onClick={() => handleOpenLink(user.companyApplyWebsiteLink)}><h6 className='h6text'>Apply</h6></button></div>

            </ul>
          ))}
            {/* </form> */}</>)}</>)}
          {searchResultsLenght === 0 && !loading && searchTerm.trim() !== '' && (
            <p>No results found.</p>
          )}
        </>)}



        {/* //-------------with out search------------------\\ */}


        {/* //------------not logged in--------------\\ */}

        {!searchTerm && (<>{!user && (<>
          {users.map((user, index) => (<ul className='homecontainer' key={index}>
            {/* <td>{user._id}</td> */}
            <div type="url" onClick={() => handleOpenLink(user.companyWebsiteLink)} ><h6 className='homeCompanyName'>{user.companyName}</h6></div>
            <div><h1 className='homejobtitel'>{user.jobRole}</h1></div>
            <div><h6 className='homecontactEmail'>Email: {user.contactEmail}</h6></div>
            <div><h6 className='homecontactEmail'>Skills: {user.contactEmail}</h6></div>
            <div>
              <Table>
                <td><p className='homeskills'>Location: {user.location}</p></td>
                <td><h6 className='homesalary'>Salary: {user.salary}</h6></td>
                <td><h6 className='homeexperience'>Experience: {user.experience}</h6></td>
              </Table>





            </div>

            <div> <Link to="/login" ><button className='homeapplybutton' ><h6 className='h6text'>Login To Get Access To Apply Jobs</h6></button></Link></div>
            <button ><Link to={`/jobsdetails/${user._id}`}><button className="button-btn">Details</button></Link></button>

          </ul>)
          )
          }
        </>)}

          {/* <form className='homecontainer'> */}
          {user && (<>{users.map((user, index) =>
          (
            <ul className='homecontainer' key={index}>
              {/* <td>{user._id}</td> */}
              <div type="url" onClick={() => handleOpenLink(user.companyWebsiteLink)} ><h6 className='homeCompanyName'>{user.companyName}</h6></div>
              <div><h1 className='homejobtitel'>{user.jobRole}</h1></div>
              <div><h6 className='homecontactEmail'>Email: {user.contactEmail}</h6></div>
              <div>

                <Table>
                  <td><p className='homeskills'>Skills: {user.skills}</p></td>
                  <td><h6 className='homesalary'>Salary: {user.salary}</h6></td>
                  <td><h6 className='homeexperience'>Experience: {user.experience}</h6></td>
                </Table>
              </div>

              <div> <button className='homeapplybutton' onClick={() => handleOpenLink(user.companyApplyWebsiteLink)}><h6 >Apply</h6></button></div>

            </ul>
          ))}
            {/* </form> */}</>)}</>)}
        <div>
          <p>Referesh the page to get more job updates</p>
        </div>
      </div>

    </>
  )
}

export default Jobs