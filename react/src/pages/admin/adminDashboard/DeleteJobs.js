import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { UseAutheContext } from "../../../hooks/UseAutheContext";
import './DeleteAlert.css';
import { Button, Modal, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';

const DeleteJobs = ({ deleteFilterData, close, filterdata }) => {
    //----------delete data-----------\\

    // const [errMsg, setErrMsg] = useState(null);
    // const [message, setMessage] = useState('');
    // const { id } = useParams()
    // const navigate = useNavigate()
    // const { user } = UseAutheContext()
    // const [showAlert, setShowAlert] = useState(false);
    // const handleDelete = async (e) => {
    //     e.preventDefault();
    //     try {
    //         if (!user) {
    //             setErrMsg('You must be logged in first.')
    //             return;
    //         }
    //         const response = await fetch(`http://localhost:5008/api/addjob/deleteJobData/${id}`, {
    //             method: 'delete',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${user.token}`
    //             },
    //             body: JSON.stringify(),
    //         });
    //         const data = await response.json();
    //         setMessage(data.message);
    //         navigate("/getjobadmin");
    //     } catch (error) {
    //         console.error('Error:', error);
    //         setMessage('An error occurred. Please try again later.');
    //     }
    //     setShowAlert(false);
    // };

    // const handleCancel = () => {
    //     navigate("/getjobadmin");
    //     setShowAlert(false);
    // };

    const { user } = UseAutheContext()
    const [errMsg, setErrMsg] = useState(null);
    const [message, setMessage] = useState('');

    const handleDelete = async (id) => {

        try {
            if (!user) {
                setErrMsg('You must be logged in first.')
                return;
            }
            const response = await fetch(`http://localhost:5008/api/addjob/deleteJobData/${deleteFilterData._id}`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(),
            });

            const data = await response.json();
            // if (data.success === true) {
            //     toast.success("Delete Successful")
            //     // navigate("/getjobadmin");
            // }
            close()
            filterdata(handleDelete)





        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again later.');
        }
        // setShowAlert(false);


    };

    return (
        <>
            {/* <p></p>
            {user && (<div className={`delete-alert ${show ? 'show' : ''}`}>
                <div className="delete-content">
                    <p>Are you sure you want to delete this item?</p>
                    <div className="btn-container">
                        <button onClick={handleDelete} className="delete-btn">Delete</button>
                        <button onClick={handleCancel} className="cancel-btn">Cancel</button>
                    </div>
                </div>
            </div>)} */}

            <Modal show={true} onHide={close}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete?</Modal.Title>
                </Modal.Header>
                <Table style={{textAlign:"center",margin:"30px 10px 20px 10px"}}>
                    <td> <button style={{backgroundColor: "red",padding:"10px 40px 10px 40px"}} className="button-btn" onClick={handleDelete}>Yes</button></td>
                    <td><button style={{padding:"10px 40px 10px 40px"}}  className="button-btn" onClick={close}>No</button> </td>
                </Table>




            </Modal>


        </>

    )
}

export default DeleteJobs