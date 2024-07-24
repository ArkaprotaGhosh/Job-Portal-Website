import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const JobDetails = () => {
    const { id } = useParams()
    const { jobdata, setJobData } = useState([])

    async function fetchData() {

        try {

            const response = axios.get(`http://localhost:5008/api/addjob/getJobdetailsbyId/${id}`)
            const data = await response.json();
            console.log(data);
            setJobData(data.data)

            console.log(response);

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


    return (
        
        <>
        <div><h1>JobDetails</h1></div>
        {/* {jobdata.map((user, index) => 
          (
            <tr key={index}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
            </tr>
          )
        )} */}
        </>
    )
}

export default JobDetails