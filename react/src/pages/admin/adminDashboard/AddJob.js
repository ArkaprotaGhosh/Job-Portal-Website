import React, { useState } from 'react';
import './AddJob.css'
import { UseAutheContext } from "../../../hooks/UseAutheContext";
import { Link, useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddJob = () => {
    const { user } = UseAutheContext()
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        companyName: "",
        companyWebsiteLink: "",
        companyApplyWebsiteLink: "",
        jobRole: "",
        location: "",
        salary: "",
        skills: "",
        experience: "",
        contactEmail: "",
        admin_Info: user?.data._id,
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!user) {
                setErrMsg('You must be logged in first.')
                return;
            }
            const response = await fetch('http://localhost:5008/api/addjob/createJob', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (data.success === true) {
                setMessage(data.message);
                navigate("/getjobadmin");
            }

        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again later.');
        }

    };
    console.log("data---------------", formData);

    var modules = {
        toolbar: [
            [{ size: ["Paragraph", "small", "large", "huge"] }],
            ["bold", "italic", "underline"],

            [{ align: [] },
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" }

            ],
            [{ "color": ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
        ]
    };

    var formats = [
        "header", "height", "bold", "italic",
        "underline", "strike", "blockquote",
        "list", "color", "bullet", "indent",
        "link", "image", "align", "size",
    ];
    return (
        <>
            {errMsg && <div className="error">{errMsg}</div>}
            {user && (<div className="addjobsform">
                <Table>

                    <th><h1 className="addjobsformh1">Add Job  </h1></th>
                    <th style={{ textAlign: "right" }}>
                        <Link to='/getjobadmin' style={{ backgroundColor: "#fff0", color: "white" }} >
                            <button
                                style={{ padding: "10px 40px 10px 40px", backgroundColor: "black", color: "white" }}
                                className="button-btn" >Back </button>
                            {/* <button  style={{ padding: "10px 40px 10px 40px" }} className="button-btn">Back</button> */}
                        </Link>
                    </th>
                </Table>
                {message && <div className="message">{message}</div>}
                <form onSubmit={handleSubmit} className="signup-form">

                    <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        placeholder='Enter Company Name'
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="url"
                        id="companyWebsiteLink"
                        name="companyWebsiteLink"
                        placeholder='Enter Company Website Link'
                        value={formData.companyWebsiteLink}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="url"
                        id="companyApplyWebsiteLink"
                        name="companyApplyWebsiteLink"
                        placeholder='Enter Apply Company Website Link'
                        value={formData.companyApplyWebsiteLink}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        id="jobRole"
                        name="jobRole"
                        placeholder='Enter Job Role'
                        value={formData.jobRole}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        id="location"
                        name="location"
                        placeholder='Enter Job Location'
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        id="skills"
                        name="skills"
                        placeholder='Enter Skills Needed'
                        value={formData.skills}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        id="salary"
                        name="salary"
                        placeholder='Enter Salary Provided'
                        value={formData.salary}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        id="experience"
                        name="experience"
                        placeholder='Enter Job Experience Required'
                        value={formData.experience}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        id="contactEmail"
                        name="contactEmail"
                        placeholder='Enter Contact Email Of The Company'
                        value={formData.contactEmail}
                        onChange={handleChange}
                        required
                    />
                    <ReactQuill
                        theme="snow"
                        name="question"
                        id="question"
                        modules={modules}
                        formats={formats}
                        placeholder="write your content ...."
                        value={formData.question}
                        onChange={handleChange}
                        style={{ 
                        marginBottom: "10px", 
                        borderRadius: "10px ",
                        border: '2px  solid #ccc' ,
                        // minHeight: '200px'
                        }}
                    >
                    </ReactQuill>

                    <button className="button-btn" type="submit">Submit</button>
                </form>
            </div >)
            }
        </>
    );
};

export default AddJob;
