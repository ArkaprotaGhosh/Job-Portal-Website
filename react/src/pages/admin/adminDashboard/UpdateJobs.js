import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { UseAutheContext } from "../../../hooks/UseAutheContext";
import axios from 'axios';
import { Modal } from 'react-bootstrap';

const UpdateJobs = () => {
    const { user } = UseAutheContext()
    const { id } = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        _id: id,
        companyName: "",
        companyWebsiteLink: "",
        companyApplyWebsiteLink: "",
        jobRole: "",
        salary: "",
        skills: "",
        experience: "",
        contactEmail: "",
    });
    const [users, setUser] = useState({
        _id: id,
        companyName: "",
        companyWebsiteLink: "",
        companyApplyWebsiteLink: "",
        location: "",
        jobRole: "",
        salary: "",
        skills: "",
        experience: "",
        contactEmail: "",
    });
    const [message, setMessage] = useState('');

    const [errMsg, setErrMsg] = useState(null);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }
        ));



    };

    async function fetchData() {

        try {
            if (!user.token) {
                setErrMsg('You must be logged in.')
                return;
            }
            axios.get(`http://localhost:5008/api/addjob/getJobdetailsbyId/${id}`
            ).then(res => {
                console.log(res);
                setUser({
                    ...users, companyName: res.data.data.companyName,
                    companyWebsiteLink: res.data.data.companyWebsiteLink,
                    companyApplyWebsiteLink: res.data.data.companyApplyWebsiteLink,
                    jobRole: res.data.data.jobRole,
                    location: res.data.data.location,
                    salary: res.data.data.salary,
                    skills: res.data.data.skills,
                    experience: res.data.data.experience,
                    contactEmail: res.data.data.contactEmail
                })
            })

            // console.log(response);

            // const data = await response.json();
            // console.log(data);

            // console.log(data);
        } catch (err) {
            console.log(err);
        }
    }



    useEffect(() => {
        fetchData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!user) {
                setErrMsg('You must be logged in first.')
                return;
            }
            const response = await fetch(`http://localhost:5008/api/addjob/updateJobData/${id}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(users),
            });
            const data = await response.json();
            setMessage(data.message);
            navigate("/getjobadmin");
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again later.');
        }

    };



    return (
        <>
            {errMsg && <div className="error">{errMsg}</div>}
            <div className="addjobsform">
                <h2 className="addjobsformh1">Edit Your Job Details </h2>
                {message && <div className="message">{message}</div>}
                {/* {users.map((userDetails, index) =>
            ( */}
                {/* <Modal> */}
                    <form onSubmit={handleSubmit} className="signup-form">

                        <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            placeholder="companyName"
                            value={users.companyName}
                            onChange={e => setUser({ ...users, companyName: e.target.value })}
                        />
                        <input
                            type="url"
                            id="companyWebsiteLink"
                            name="companyWebsiteLink"
                            placeholder="companyWebsiteLink"
                            value={users.companyWebsiteLink}
                            onChange={e => setUser({ ...users, companyWebsiteLink: e.target.value })}
                        />
                        <input
                            type="url"
                            id="companyApplyWebsiteLink"
                            name="companyApplyWebsiteLink"
                            placeholder="companyApplyWebsiteLink"
                            value={users.companyApplyWebsiteLink}
                            onChange={e => setUser({ ...users, companyApplyWebsiteLink: e.target.value })}
                        // onChange={handleChange}
                        />
                        <input
                            type="text"
                            id="jobRole"
                            name="jobRole"
                            placeholder="JobRole"
                            value={users.jobRole}
                            onChange={e => setUser({ ...users, jobRole: e.target.value })}
                        // onChange={handleChange}
                        />
                        <input
                            type="text"
                            id="location"
                            name="location"
                            placeholder="Enter Job Location"
                            value={users.location}
                            onChange={e => setUser({ ...users, location: e.target.value })}
                        // onChange={handleChange}
                        />
                        <input
                            type="text"
                            id="skills"
                            name="skills"
                            placeholder="skills"
                            value={users.skills}
                            onChange={e => setUser({ ...users, skills: e.target.value })}
                        // onChange={handleChange}
                        />
                        <input
                            type="text"
                            id="salary"
                            name="salary"
                            placeholder="salary"
                            value={users.salary}
                            onChange={e => setUser({ ...users, salary: e.target.value })}
                        // onChange={handleChange}
                        />

                        <input
                            type="text"
                            id="experience"
                            name="experience"
                            placeholder="experience"
                            value={users.experience}
                            onChange={e => setUser({ ...users, experience: e.target.value })}
                        // onChange={handleChange}
                        />
                        <input
                            type="email"
                            id="contactEmail"
                            name="contactEmail"
                            placeholder="contactEmail"
                            value={users.contactEmail}
                            onChange={e => setUser({ ...users, contactEmail: e.target.value })}
                        // onChange={handleChange}
                        />

                        <button className="button-btn" type="submit">Click To Update</button>
                    </form>
                {/* </Modal> */}
                {/* )
            )}  */}
            </div>
        </>
    )
}

export default UpdateJobs