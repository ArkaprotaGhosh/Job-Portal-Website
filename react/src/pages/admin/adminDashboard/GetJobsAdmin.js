import React from 'react'

import './AddJob.css'
import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import { UseAutheContext } from "../../../hooks/UseAutheContext";
import { Link } from 'react-router-dom';
import DeleteJobs from './DeleteJobs';

function GetJobsAdmin() {
    const [users, setUser] = useState([]);
    const { user } = UseAutheContext()
    const [errMsg, setErrMsg] = useState(null);
    const [message, setMessage] = useState('');
    const [deleteData, setDeleteData] = useState({})
    const [deleteModal, setDeleteModal] = useState(false)
    // const navigate = useNavigate()



    async function fetchData() {

        try {
            if (!user.token) {
                setErrMsg('You must be logged in.')
                return;
            }
            const response = await fetch((`http://localhost:5008/api/addjob/getallAdminjob/${user.data._id}`), {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(),
            });
            // console.log(response);
            const data = await response.json();
            if (data.success === true) {
                setUser(data.data)

            }
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {

        fetchData()


    }, [user])

    const getDataAsap = (data) => {
        console.log(data);


        fetchData();

    }
    //-----------delete----------\\

    const deleteItem = (vall) => {
        console.log("valll===========>", vall);
        setDeleteData(vall)
        openDeleteModal()

    }


    const openDeleteModal = () => {
        setDeleteModal(true)
    }
    const closeDeleteModal = () => {
        setDeleteModal(false)
    }

    return (
        <>

            {/* {!user && <> */}
            {errMsg && <div className="error">{errMsg}</div>}
            {message && <div className="message">{message}</div>}
            {/* </>} */}


            {user && <>
                <div className="addjobsform">
                    <div style={{marginBottom:"10px",textAlign: "right"}}>
                        <Link to='/addjob'><button  className="button-btn" >Add Job Details</button> </Link>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>

                                <th>Company Name</th>
                                <th>Company Email</th>

                                <th>Location</th>
                                <th>Skills</th>
                                <th>Salary</th>
                                <th>experience</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((jobdetails, index) =>
                            (
                                <tr key={index}>
                                    <td>{jobdetails.companyName}</td>
                                    <td>{jobdetails.contactEmail}</td>
                                    <td>{jobdetails.location}</td>
                                    <td>{jobdetails.skills}</td>
                                    <td>{jobdetails.salary}</td>
                                    <td>{jobdetails.experience}</td>
                                    <td><Link to={`/updatejob/${jobdetails._id}`}><button className="button-btn">Edit</button></Link></td>
                                    <td><button className="button-btn" onClick={() => deleteItem(jobdetails)}>Delete</button>
                                    </td>
                                </tr>
                            )
                            )}
                        </tbody>
                    </Table>
                </div>
            </>}

            {deleteModal ? (<DeleteJobs filterdata={getDataAsap} deleteFilterData={deleteData} close={closeDeleteModal} />) : null}
        </>
    )
}

export default GetJobsAdmin
