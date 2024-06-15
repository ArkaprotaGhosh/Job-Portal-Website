import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UseLogin } from '../../hooks/UseLogin';

const AdminLogin = () => {

  const navigate = useNavigate()



  // const LOGIN_ROUTE = `http://localhost:5008/api/adminsignup/login`;

  const { login, isLoading, message } = UseLogin();

  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  async function handleSubmit(e) {
    e.preventDefault();
    // if (dataSend.data.status === 202) {
    await login(email, password);
    // navigate('/addjob')
    // }

  }
  

  return (
    <>

      <div className="login-form-container">
        <h2>Admin Login</h2>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        {message && <div className="message">{message}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          {/* //-------email-------\\ */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            ref={emailRef}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* //---------password---------\\ */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* <Link to={`/addjob/${data._id}`}> */}
          <button className="button-btn" type="submit">Login</button>
          {/* </Link> */}
          <Link className="forgetpassword" to="/adminsignup"><strong>Create Account</strong></Link>
        </form>
      </div>
    </>

  )
}

export default AdminLogin