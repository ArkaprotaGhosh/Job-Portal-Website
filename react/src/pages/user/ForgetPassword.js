import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: ''
  });
  const [message, setMessage] = useState('');
  const handleChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, email: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5008/api/user/forgetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success === true) {

        setMessage('Verification Code Send successful!');
        navigate("/changepassword");
      } else {
        setMessage(data.message || '. not match with mail.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    }
    console.log(formData);
  };



  return (
    <div className="forgot-password-form-container">
      <h2>Forgot Password</h2>
      {message && <div className="message">{message}</div>}
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <input
          type="email"
          placeholder="Enter your email"
          value={formData.email} // Corrected value assignment
          onChange={handleChange}
          required
        />
        <button className="button-btn" type="submit">Submit</button>
      </form>
    </div>
  )
}

export default ForgetPassword