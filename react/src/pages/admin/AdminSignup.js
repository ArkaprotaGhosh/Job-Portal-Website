
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminSignup = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    adminname: '',
    email: '',
    password: '',
    phoneNo: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5008/api/adminsignup/signUpadmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success === true) {
        setMessage(data.message);
        navigate("/adminlogin")
      } else {
        setMessage(data.message || "Invalid Signup Please Try Again")
      }

    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <>
     <div className="diva">
          <p className="para1">Keep Applying!!</p>
          <p className="para2">200% HIKE IN SALARY</p>
          <p className="para3">
          Your dream job is closer than you think. We focus on your career aspirations, matching your unique skills and goals with the best opportunities available. Our personalized approach ensures you find the perfect fit. Start your journey to success with us today and unlock your full potential!
          </p>
        </div>
      <div className="signup-form-container">
        <h2>Sign Up Admin</h2>
        {message && <div className="message">{message}</div>}
        <form onSubmit={handleSubmit} className="signup-form">

          <input
            type="text"
            name="adminname"
            placeholder="Name"
            value={formData.adminname}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phoneNo"
            placeholder="Phone Number"
            value={formData.phoneNo}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button className="button-btn" type="submit">Sign Up</button>
          <Link style={{ color: "#67b311" }} to="/adminlogin"><strong>Already Have An Account</strong></Link>
        </form>
      </div>
    </>

  )
}

export default AdminSignup