import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const ChangePassword = ({ value }) => {
  console.log("value---------------", value);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    otp: '',
    newPassword: '',
    confirmPassword: '' // Corrected the key name to match the state variable
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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
      const response = await fetch(`http://localhost:5008/api/login/resetPassword/${formData.otp}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.status === 200) {
        
        setSuccess(true);
        setError('');
        setMessage(data.message || 'Password has been changed successfully!');
        navigate('/login');
      } else {
        setError('Invalid OTP. Please try again.');
        setSuccess(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    }
  };
 



  
      
       
       
   
    


  return (



    <>
      <div className="change-password-form-container">
        <h2>Change Password {value}</h2>
        {message && <div className="message">{message}</div>}
        <form onSubmit={handleSubmit} className="change-password-form">
          <div>
            {success ? (
              <div>OTP verified successfully!</div>
            ) : (
              <form onSubmit={handleSubmit}>
                <label>Enter OTP</label>
                <input
                  type="text"
                  value={formData.otp}
                  onChange={handleChange}
                />
                {error && <div style={{ color: 'red' }}>{error}</div>}
                {/* <button type="submit">Verify OTP</button> */}
              </form>
            )}
          </div>
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button className="button-btn" type="submit">Change Password</button>
        </form>
      </div>
    </>
  )
}


export default ChangePassword