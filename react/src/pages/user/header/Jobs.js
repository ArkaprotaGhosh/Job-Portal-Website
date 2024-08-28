import React, { useEffect, useState } from "react";
import "./Jobs.css";
// import { redirect } from 'react-router-dom';
import { UseAutheContext } from "../../../hooks/UseAutheContext";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { UseSearchJob } from "../../../hooks/UseSearchJob";

const Jobs = () => {
  const [users, setUser] = useState([]);
  const { user } = UseAutheContext();
  // const [message, setMessage] = useState('');

  async function fetchData() {
    try {
      const response = await fetch(
        "http://localhost:5008/api/addjob/getalljob"
      );
      // console.log(response);
      const data = await response.json();
      // setMessage('Internal Error!');
      // console.log(data);
      setUser(data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenLink = (url) => {
    window.open(url, "_blank");
  };


  //------SEARCH--------\\
        const { searchTerm, loading, searchResultsLenght, searchResults } = UseSearchJob();

  return (
    <>
      <div style={{ width: "100%" }}>
{loading && <p>Loading...</p>}
          {/* <SearchComponent /> */}
          {searchTerm && (
            <>
              {searchResultsLenght > 0 && (
                <>
                  {!user && (
                    <>
                      {searchResults.map((user, index) => (
                        <ul className="homecontainer" key={index}>
                          {/* <td>{user._id}</td> */}
                          <div
                            type="url"
                            onClick={() =>
                              handleOpenLink(user.companyWebsiteLink)
                            }
                          >
                            <h6 className="homeCompanyName">
                              {user.companyName}
                            </h6>
                          </div>
                          <div>
                            <h1 className="homejobtitel">{user.jobRole}</h1>
                          </div>
                          <div>
                            <h6 className="homecontactEmail">
                              Email: {user.contactEmail}
                            </h6>
                          </div>
                          <div>
                            <h6 className="homecontactEmail">
                              Skills: {user.contactEmail}
                            </h6>
                          </div>
                          <div>
                            <Table>
                              <td>
                                <p className="homeskills">
                                  Location: {user.location}
                                </p>
                              </td>
                              <td>
                                <h6 className="homesalary">
                                  Salary: {user.salary}
                                </h6>
                              </td>
                              <td>
                                <h6 className="homeexperience">
                                  Experience: {user.experience}
                                </h6>
                              </td>
                            </Table>
                          </div>
                          <div>
                            {" "}
                            <Link to="/login">
                              <button className="homeapplybutton">
                                <h6 className="h6text">
                                  Login To Get Access To Apply Jobs
                                </h6>
                              </button>
                            </Link>
                          </div>
                        </ul>
                      ))}
                    </>
                  )}

                  {/* <form className='homecontainer'> */}
                  {user && (
                    <>
                      {searchResults.map((user, index) => (
                        <ul className="homecontainer" key={index}>
                          {/* <td>{user._id}</td> */}
                          <div
                            type="url"
                            onClick={() =>
                              handleOpenLink(user.companyWebsiteLink)
                            }
                          >
                            <h6 className="homeCompanyName">
                              {user.companyName}
                            </h6>
                          </div>
                          <div>
                            <h1 className="homejobtitel">{user.jobRole}</h1>
                          </div>
                          <div>
                            <h6 className="homecontactEmail">
                              Email: {user.contactEmail}
                            </h6>
                          </div>
                          <div>
                            <Table>
                              <td>
                                <p className="homeskills">
                                  Skills: {user.skills}
                                </p>
                              </td>
                              <td>
                                <h6 className="homesalary">
                                  Salary: {user.salary}
                                </h6>
                              </td>
                              <td>
                                <h6 className="homeexperience">
                                  Experience: {user.experience}
                                </h6>
                              </td>
                            </Table>
                          </div>

                          <div>
                            {" "}
                            <button
                              className="homeapplybutton"
                              onClick={() =>
                                handleOpenLink(user.companyApplyWebsiteLink)
                              }
                            >
                              <h6 className="h6text">Apply</h6>
                            </button>
                          </div>
                        </ul>
                      ))}
                      {/* </form> */}
                    </>
                  )}
                </>
              )}
              {searchResultsLenght === 0 &&
                !loading &&
                searchTerm.trim() !== "" && <p>No results found.</p>}
            </>
          )}

          {/* //-------------with out search------------------\\ */}

          {/* //------------not logged in--------------\\ */}

          {!searchTerm && (
            <>
              {!user && (
                <>
                  {users.map((user, index) => (
                    <ul className="homecontainer" key={index}>
                      {/* <td>{user._id}</td> */}
                      <div
                        type="url"
                        onClick={() => handleOpenLink(user.companyWebsiteLink)}
                      >
                        <h6 className="homeCompanyName">{user.companyName}</h6>
                      </div>
                      <div>
                        <h1 className="homejobtitel">{user.jobRole}</h1>
                      </div>
                      <div>
                        <h6 className="homecontactEmail">
                          Email: {user.contactEmail}
                        </h6>
                      </div>
                      <div>
                        <h6 className="homecontactEmail">
                          Skills: {user.contactEmail}
                        </h6>
                      </div>
                      <div>
                        <Table>
                          <td>
                            <p className="homeskills">
                              Location: {user.location}
                            </p>
                          </td>
                          <td>
                            <h6 className="homesalary">
                              Salary: {user.salary}
                            </h6>
                          </td>
                          <td>
                            <h6 className="homeexperience">
                              Experience: {user.experience}
                            </h6>
                          </td>
                        </Table>
                      </div>

                      <div>
                        {" "}
                        <Link to="/login">
                          <button className="homeapplybutton">
                            <h6 className="h6text">
                              Login To Get Access To Apply Jobs
                            </h6>
                          </button>
                        </Link>
                      </div>
                      <button>
                        <Link to={`/jobsdetails/${user._id}`}>
                          <button className="button-btn">Details</button>
                        </Link>
                      </button>
                    </ul>
                  ))}
                </>
              )}

              {/* <form className='homecontainer'> */}
              {user && (
                <>
                  {users.map((user, index) => (
                    <ul className="homecontainer" key={index}>
                      {/* <td>{user._id}</td> */}
                      <div
                        type="url"
                        onClick={() => handleOpenLink(user.companyWebsiteLink)}
                      >
                        <h6 className="homeCompanyName">{user.companyName}</h6>
                      </div>
                      <div>
                        <h1 className="homejobtitel">{user.jobRole}</h1>
                      </div>
                      <div>
                        <h6 className="homecontactEmail">
                          Email: {user.contactEmail}
                        </h6>
                      </div>
                      <div>
                        <Table>
                          <td>
                            <p className="homeskills">Skills: {user.skills}</p>
                          </td>
                          <td>
                            <h6 className="homesalary">
                              Salary: {user.salary}
                            </h6>
                          </td>
                          <td>
                            <h6 className="homeexperience">
                              Experience: {user.experience}
                            </h6>
                          </td>
                        </Table>
                      </div>

                      <div>
                        {" "}
                        <button
                          className="homeapplybutton"
                          onClick={() =>
                            handleOpenLink(user.companyApplyWebsiteLink)
                          }
                        >
                          <h6>Apply</h6>
                        </button>
                      </div>
                    </ul>
                  ))}
                  {/* </form> */}
                </>
              )}
            </>
          )}
          <div>
            <p>Referesh the page to get more job updates</p>
          </div>
      </div>
    </>
  );
};

export default Jobs;
