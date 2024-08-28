import React from 'react'
import JobDetails from './JobDetails'
import Jobs from './Jobs'
import { SearchCP } from '../../components/reusable/SearchCP'

const JobPage = () => {
    return (
        <>
                <div>
                <div><SearchCP /></div>

            <div className='d-flex justify-content-center text-center'>
                <div className='col-4'>
                    <Jobs />
                </div>
                <div className='col-4'>
                    <JobDetails />

                </div>
                </div>



            </div>



        </>
    )
}

export default JobPage